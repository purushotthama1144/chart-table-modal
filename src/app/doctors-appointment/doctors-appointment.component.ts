import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { AppointmentService } from './appointment.service';
import { MatCalendarCellClassFunction, MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-doctors-appointment',
  templateUrl: './doctors-appointment.component.html',
  styleUrls: ['./doctors-appointment.component.css']
})
export class DoctorsAppointmentComponent implements OnInit, AfterViewInit  {
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
  appointmentData:any;

  displayedColumns: string[] = [
    'department',
    'doctorName',
    'date',
    'slotTime',
    'patientName',
    'patientContact',
    'patientAge',
  ];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private appointmentService: AppointmentService, private datePipe: DatePipe){}

  ngOnInit(): void {
    this.fetchData()
    this.fetchAppointment()
    this.refreshDataSource()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  fetchData(){
    this.appointmentService.getDummyData().subscribe((data) => {
      console.log(data)
      this.apiData = data
    })
  }

  fetchAppointment() {
    this.appointmentService.getAppointmenntDetails().subscribe((data)=> {
      console.log(data)
      this.appointmentData = data;

    })
  }

  refreshDataSource(){
    this.dataSource = new MatTableDataSource(this.appointmentData);
    this.dataSource.paginator = this.paginator;
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
