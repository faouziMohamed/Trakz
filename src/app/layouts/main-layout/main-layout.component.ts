import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { PageTitles } from '@/app/models/navLabel';
import { IUser } from '@/models/User';
import { TaskService } from '@/services/tasks/task.service';
import { slugToTitle } from '@/utils/trakzUtils';

const bgImages = {
  [PageTitles.MyDay]: 'bg-light-my-day darks:bg-dark-my-day',
  [PageTitles.Tasks]: 'bg-light-tasks darks:bg-dark-tasks',
  [PageTitles.Projects]: 'bg-light-projects darks:bg-dark-projects',
  [PageTitles.Planned]: 'bg-light-planned darks:bg-dark-planned',
  [PageTitles.Important]: 'bg-light-important darks:bg-dark-important',
  [PageTitles.Home]: '',
};
function getBgImage(page: PageTitles) {
  return bgImages[page] || bgImages[PageTitles.Home];
}
function getPageTitle(page: PageTitles) {
  if (page === PageTitles.Home || !(page in PageTitles))
    return 'Trakz - Your the only task manager you need';
  return `${page} | Trakz`;
}

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  isHandset$: Observable<boolean> | undefined;

  isSmallScreen: Observable<boolean> | undefined;

  activePage: PageTitles = PageTitles.MyDay;

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
  ) {
    this.isHandset$ = this._breakpointObserver.observe(Breakpoints.XSmall).pipe(
      map((result) => result.matches),
      shareReplay(),
    );

    this.isSmallScreen = this._breakpointObserver
      .observe('(min-width: 600px) and (max-width: 800px)')
      .pipe(
        map((result) => result.matches),
        shareReplay(),
      );
  }

  onActivePageChange(page: PageTitles) {
    this.activePage = page;
    document.title = getPageTitle(page);
    this.bgImage = getBgImage(page);
  }

  ngOnInit(): void {
    this.currentDate = new Date();

    this._taskDataService.getSelectedTask().subscribe((task) => {
      this.openRightSideNav = !!task;
    });

    this._router.events.subscribe(($event) => {
      if (!($event instanceof NavigationEnd)) return;
      const { url: u } = $event;
      const url = u === '/' ? '/my-day' : u;
      const page = url.split('/')[1];
      this.onActivePageChange(slugToTitle(page) as PageTitles);
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
