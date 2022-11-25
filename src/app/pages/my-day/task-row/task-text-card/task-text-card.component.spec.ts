import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTextCardComponent } from './task-text-card.component';

describe('TaskTextCardComponent', () => {
  let component: TaskTextCardComponent;
  let fixture: ComponentFixture<TaskTextCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskTextCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskTextCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
