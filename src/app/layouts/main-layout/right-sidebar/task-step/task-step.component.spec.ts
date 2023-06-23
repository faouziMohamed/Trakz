import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskStepComponent } from './task-step.component';

describe('TaskStepComponent', () => {
  let component: TaskStepComponent;
  let fixture: ComponentFixture<TaskStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
