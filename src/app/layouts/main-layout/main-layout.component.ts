import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IUser } from '@models/User';
import { defaultNavLabels } from '@models/navLabel';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  isHandset$: Observable<boolean> = this._breakpointObserver
    .observe(Breakpoints.XSmall)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );

  activePage: { title: string | defaultNavLabels } = {
    title: defaultNavLabels.MyDay,
  };
  currentDate: Date | undefined;
  user: IUser = {
    name: 'Shiba Inu',
    email: 'shiba@mail.com',
    picture: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
  };

  constructor(
    private _breakpointObserver: BreakpointObserver,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {}

  onActivePageChange(page: defaultNavLabels | string) {
    this.activePage.title = page;
    document.title = page + ' | Trakz';
  }

  ngOnInit(): void {
    this.currentDate = new Date();
    // get the current page route first page segment
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const page = event.url.split('/')[1];
        this.onActivePageChange(this.slugToTitle(page));
      }
    });
  }

  slugToTitle(str: string) {
    // my-day => My Day // my_day => My Day // my day => My Day // myDay => MyDay
    return str
      .replace(/^\w|[A-Z]|\b\w/g, function (word) {
        return word.toUpperCase();
      })
      .replace(/[- ]+/g, ' ');
  }
}
