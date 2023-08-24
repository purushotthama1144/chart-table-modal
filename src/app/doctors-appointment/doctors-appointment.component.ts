import { Component, Input, OnInit } from '@angular/core';
import { AppointmentService } from './appointment.service';
import { MatCalendarCellClassFunction, MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-doctors-appointment',
  templateUrl: './doctors-appointment.component.html',
  styleUrls: ['./doctors-appointment.component.css']
})
export class DoctorsAppointmentComponent implements OnInit {
apiData:any;
  departments: string[] = [];
  doctors: string[] = [];
  availableSlots: string[] = [];
  selectedBranch: string = '';
  selectedDepartment: string = '';
  selectedDoctor: string = "";
  selectedDate: Date | null = null;
  availableDates: string[] = [];
  selectedSlot:any;
  isCalendarVisible = false;

  constructor(private appointmentService: AppointmentService){}

  ngOnInit(): void {
    this.fetchData()
  }

  fetchData(){
    this.appointmentService.getDummyData().subscribe((data) => {
      console.log(data)
      this.apiData = data
    })
  }

  onBranchSelection() {
    this.departments = this.apiData.departments[this.selectedBranch] || [];
    console.log(this.departments)
    this.doctors = [];
    this.availableSlots = [];
  }

  onDepartmentSelection() {
    this.doctors = this.apiData.doctors[this.selectedDepartment] || [];
    console.log(this.doctors)
    this.availableSlots = [];
  }

  onDoctorSelection() {
    if (this.selectedDoctor) {
      this.availableDates = this.apiData.date[this.selectedDoctor] || [];
      console.log(this.availableSlots)
    } else {
      this.availableSlots = [];
    }
  }

  toggleCalendarVisibility() {
    this.isCalendarVisible = !this.isCalendarVisible;
  }

  isDateEnabled = (date: Date | null): boolean => {
    if (!date) {
      return false;
    }
    const formattedDate = moment(date).format('DD-MM-YYYY');
    return this.availableDates.includes(formattedDate);
  };

  selectDate(selectedDate: any) {
    console.log('Selected Date:', selectedDate);
  }
 
  bookAppointment() {
    console.log('Appointment booked:', {
      branch: this.selectedBranch,
      department: this.selectedDepartment,
      doctor: this.selectedDoctor,
      date: this.selectedDate,
      slot: this.selectedSlot,
    });
  }
}
