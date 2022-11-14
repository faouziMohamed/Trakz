import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrakzLogoComponent } from './trakz-logo.component';

describe('TrakzLogoComponent', () => {
  let component: TrakzLogoComponent;
  let fixture: ComponentFixture<TrakzLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrakzLogoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrakzLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
