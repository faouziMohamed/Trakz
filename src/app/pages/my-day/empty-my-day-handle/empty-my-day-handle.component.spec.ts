import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyMyDayHandleComponent } from './empty-my-day-handle.component';

describe('EmptyMyDayHandleComponent', () => {
  let component: EmptyMyDayHandleComponent;
  let fixture: ComponentFixture<EmptyMyDayHandleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmptyMyDayHandleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmptyMyDayHandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
