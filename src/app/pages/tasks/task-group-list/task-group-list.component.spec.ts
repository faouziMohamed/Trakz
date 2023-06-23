import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskGroupListComponent } from './task-group-list.component';

describe('TaskGroupListComponent', () => {
  let component: TaskGroupListComponent;
  let fixture: ComponentFixture<TaskGroupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskGroupListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
