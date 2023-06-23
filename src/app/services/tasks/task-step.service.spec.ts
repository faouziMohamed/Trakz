import { TestBed } from '@angular/core/testing';

import { TaskStepService } from './task-step.service';

describe('TaskStepService', () => {
  let service: TaskStepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskStepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
