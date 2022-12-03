import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrakzNotificationComponent } from './trakz-notification.component';

describe('TrakzNotificationComponent', () => {
  let component: TrakzNotificationComponent;
  let fixture: ComponentFixture<TrakzNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrakzNotificationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrakzNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
