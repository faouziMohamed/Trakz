import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';

import { INavLink, PageTitles } from '@/models/navLabel';
import { IUser } from '@/models/User';
import { FoldersService } from '@/services/tasks/folders.service';
import { TaskService } from '@/services/tasks/task.service';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss'],
})
export class LeftSidebarComponent {
  @Input() isHandset$: Observable<boolean> | undefined;

  navLinks: INavLink[] = [];

  @Input() user: IUser | undefined;

  @Input() drawer!: MatSidenav;

  @Input() activePage!: PageTitles;

  @Output() activePageChange = new EventEmitter<PageTitles>();

  constructor(
    private _tasksService: TaskService,
    private _foldersService: FoldersService,
  ) {
    this._foldersService.getFolders().subscribe((folders) => {
      this.navLinks = folders;
    });
  }

  onActivePageChange(title: PageTitles) {
    this.activePage = title;
    this.activePageChange.emit(title);
  }
}
