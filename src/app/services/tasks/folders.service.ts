import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { INavLink, PageTitles } from '@/models/navLabel';
import { TaskService } from '@/services/tasks/task.service';

const NAV_LINKS: INavLink[] = [
  { label: PageTitles.MyDay, link: '/my-day', icon: 'wb_sunny', count: 0 },
  { label: PageTitles.Important, link: '/important', icon: 'star', count: 0 },
  {
    label: PageTitles.Planned,
    link: '/planned',
    icon: 'calendar_month',
    count: 0,
  },
  { label: PageTitles.Tasks, link: '/tasks', icon: 'checklist', count: 0 },
  { label: PageTitles.Projects, link: '/projects', icon: 'folder', count: 0 },
];
@Injectable({
  providedIn: 'root',
})
export class FoldersService {
  folders = new BehaviorSubject<INavLink[]>(NAV_LINKS);

  constructor(private _tasksService: TaskService) {
    NAV_LINKS.forEach((link) => {
      this._tasksService.countTasksObservable(link.label).subscribe((count) => {
        // eslint-disable-next-line no-param-reassign
        link.count = count;
      });
    });
  }

  getFolders() {
    return this.folders.asObservable();
  }
}
