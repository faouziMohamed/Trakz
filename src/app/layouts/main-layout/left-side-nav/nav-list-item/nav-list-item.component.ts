import { Component, EventEmitter, Input, Output } from '@angular/core';

import { INavLink, PageTitles } from '@/models/navLabel';

@Component({
  selector: 'app-nav-list-item',
  templateUrl: './nav-list-item.component.html',
  styleUrls: ['./nav-list-item.component.scss'],
})
export class NavListItemComponent {
  @Input() navLink!: INavLink;

  @Output() activePageChange = new EventEmitter<PageTitles>();

  onActivePageChange(label: PageTitles) {
    this.activePageChange.emit(label);
  }
}
