import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsAppointmentComponent } from './doctors-appointment.component';

describe('DoctorsAppointmentComponent', () => {
  let component: DoctorsAppointmentComponent;
  let fixture: ComponentFixture<DoctorsAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorsAppointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorsAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
