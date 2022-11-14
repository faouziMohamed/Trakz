import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDayComponent } from './my-day.component';

describe('MyDayComponent', () => {
  let component: MyDayComponent;
  let fixture: ComponentFixture<MyDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyDayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
