import { Component, EventEmitter, Input, Output } from '@angular/core';

import { INavLink, PageTitles } from '@/models/navLabel';

@Component({
  selector: 'app-sidebar-item',
  templateUrl: './left-sidebar-item.component.html',
  styleUrls: ['./left-sidebar-item.component.scss'],
})
export class LeftSidebarItemComponent {
  @Input() navLink!: INavLink;

  @Output() activePageChange = new EventEmitter<PageTitles>();

  onActivePageChange(label: PageTitles) {
    this.activePageChange.emit(label);
  }
}
