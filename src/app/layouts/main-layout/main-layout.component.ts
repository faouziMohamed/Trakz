import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PageTitles } from '@models/navLabel';
import { IUser } from '@models/User';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { TaskService } from '@/services/tasks/task.service';
import { slugToTitle } from '@/utils/trakzUtils';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  isHandset$: Observable<boolean> = this._breakpointObserver
    .observe(Breakpoints.XSmall)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );

  isSmallScreen: Observable<boolean> = this._breakpointObserver
    .observe('(min-width: 600px) and (max-width: 800px)')
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );

  activePage: { title: string | PageTitles } = {
    title: PageTitles.MyDay,
  };

  currentDate: Date | undefined;

  user: IUser = {
    name: 'Shiba Inu',
    email: 'shiba@mail.com',
    picture: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
  };

  openRightSideNav = false;

  bgImage = 'bg-dune';

  private _routerObserver: Subscription | undefined;

  constructor(
    private _breakpointObserver: BreakpointObserver,
    private _router: Router,
    private _taskDataService: TaskService,
  ) {}

  onActivePageChange(page: PageTitles | string) {
    this.activePage.title = page;
    document.title = `${page} | Trakz`;
    // 'night-bab'
    //   'night-dusk'
    //   'night-beach'
    //   'mountain-beach'
    //   dune
    //   street
    switch (page) {
      case PageTitles.MyDay: {
        this.bgImage = 'bg-dune';
        break;
      }
      case PageTitles.Tasks: {
        this.bgImage = 'bg-street';
        break;
      }
      case PageTitles.Projects: {
        this.bgImage = 'bg-mountain-beach';
        break;
      }
      default:
        this.bgImage = 'bg-night-bab';
    }
  }

  ngOnInit(): void {
    this.currentDate = new Date();

    this._taskDataService.getSelectedTask().subscribe((task) => {
      this.openRightSideNav = !!task;
    });

    this._router.events.subscribe(($event) => {
      if ($event instanceof NavigationEnd) {
        const { url } = $event;
        const page = url.split('/')[1];
        this.onActivePageChange(slugToTitle(page));
      }
    });
  }

  handleCloseRightSideNav() {
    this._taskDataService.setSelection(null);
  }

  ngOnDestroy(): void {
    this._breakpointObserver.ngOnDestroy();
    this._routerObserver?.unsubscribe();
  }
}
