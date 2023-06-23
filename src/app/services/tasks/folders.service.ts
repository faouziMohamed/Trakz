import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { INavLink, pageTitles } from '@/models/navLabel';
import { TaskService } from '@/services/tasks/task.service';

const DEFAULT_FOLDERS: INavLink[] = [
  { label: pageTitles.MyDay, link: '/my-day', icon: 'wb_sunny', count: 0 },
  { label: pageTitles.Important, link: '/important', icon: 'star', count: 0 },
  {
    label: pageTitles.Planned,
    link: '/planned',
    icon: 'calendar_month',
    count: 0,
  },
  { label: pageTitles.Tasks, link: '/tasks', icon: 'checklist', count: 0 },
  { label: pageTitles.Projects, link: '/projects', icon: 'folder', count: 0 },
];
@Injectable({
  providedIn: 'root',
})
export class FoldersService {
  folders = new BehaviorSubject<INavLink[]>(DEFAULT_FOLDERS);

  constructor(private _tasksService: TaskService) {
    DEFAULT_FOLDERS.forEach((link) => {
      this._tasksService //
        .countTasksObservable(link.label) //
        .subscribe((count) => {
          // eslint-disable-next-line no-param-reassign
          link.count = count;
        });
    });
  }

  getFolders() {
    return this.folders.asObservable();
  }
}
