import { Component, Input, OnInit } from '@angular/core';
import { AppointmentService } from './appointment.service';
import { MatCalendarCellClassFunction, MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';

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
  dateEvent:any;

  constructor(private appointmentService: AppointmentService, private datePipe: DatePipe){}

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

  onDateSelected(selectedDate: any) {
    this.dateEvent = moment(selectedDate.value).format('DD-MM-YYYY');
    // this.dateEvent = this.datePipe.transform(selectedDate.value, 'short')
    console.log(this.dateEvent)
    console.log(this.apiData.day)
    this.availableSlots = this.apiData.day[this.dateEvent] || [];
    console.log('Selected Date:', this.availableSlots);
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
