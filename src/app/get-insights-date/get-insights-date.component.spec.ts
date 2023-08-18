import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetInsightsDateComponent } from './get-insights-date.component';

describe('GetInsightsDateComponent', () => {
  let component: GetInsightsDateComponent;
  let fixture: ComponentFixture<GetInsightsDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetInsightsDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetInsightsDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
