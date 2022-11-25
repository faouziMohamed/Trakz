import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyCalendarComponent } from './empty-calendar.component';

describe('EmptyCalComponent', () => {
  let component: EmptyCalendarComponent;
  let fixture: ComponentFixture<EmptyCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmptyCalendarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmptyCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
