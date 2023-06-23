import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskInputComponent } from './add-task-input.component';

describe('AddTaskInputComponent', () => {
  let component: AddTaskInputComponent;
  let fixture: ComponentFixture<AddTaskInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTaskInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTaskInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
