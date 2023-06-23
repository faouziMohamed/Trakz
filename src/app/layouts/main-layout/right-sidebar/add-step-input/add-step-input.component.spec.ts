import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStepInputComponent } from './add-step-input.component';

describe('AddStepInputComponent', () => {
  let component: AddStepInputComponent;
  let fixture: ComponentFixture<AddStepInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddStepInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddStepInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
