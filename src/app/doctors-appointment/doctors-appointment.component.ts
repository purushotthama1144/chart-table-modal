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
  availableSlots: string[] = [];
  selectedBranch: any;
  branchData:any;
  selectedBranchData:any;
  departmentData:any;
  selectedDepartment: any;
  selectedDepartmentData: any;
  selectedDoctor: any;
  doctorsData:any;
  selectedDoctorData:any;
  selectedDate: Date | null = null;
  dateData = ['2023-08-29', '2023-08-30', '2023-08-31', '2023-09-01'];
  selectedDateData:any;
  isCalendarVisible = false;
  
  selectedSlot:any;
  appointmentData:any;
  dateEvent:any;

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
    this.fetchBranchDetails()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  refreshDataSource(){
    this.dataSource = new MatTableDataSource(this.appointmentData);
    this.dataSource.paginator = this.paginator;
  }

  fetchBranchDetails() {
    const payload = {
      tenant:1
    }
    
    this.appointmentService.getBranch(payload).subscribe((data)=> {
      if(data){
        console.log(data.results)
        this.branchData = data.results;
      }
    })
  }

  onBranchSelection() {
    this.selectedBranchData = this.branchData.find((val:any) => val.id == this.selectedBranch);
    this.selectedDepartment = "";
    this.selectedDoctor = "";
    this.fetchDepartment();
  }

  fetchDepartment() {
    const payload = {
      branch: this.selectedBranchData.id, 
      tenant: this.selectedBranchData.organization
    }

    this.appointmentService.getDepartment(payload).subscribe((data)=> {
      if(data){
        this.departmentData = data.results;
      }
    })
  }

  onDepartmentSelection() {
    this.selectedDepartmentData = this.departmentData.find((val:any) => val.id == this.selectedDepartment);
    this.selectedDoctor = "";
    this.fetchDoctors();
  }

  fetchDoctors() {
    const payload = {
      department: this.selectedDepartmentData.id, 
      tenant: this.selectedDepartmentData.organization,
      branch: this.selectedDepartmentData.branch
    }
    this.appointmentService.getDoctors(payload).subscribe((data)=> {
      if(data){
        this.doctorsData = data.results;
      }
    })
  }

  onDoctorSelection() {
    this.selectedDoctorData = this.doctorsData.find((doctorData:any) => doctorData.doctor_detail.doctor_id === this.selectedDoctor);
    
    console.log(this.selectedDoctorData)
    // this.fetchDates()
  }

  fetchDates() {
    const payload = {
      department: this.selectedDepartmentData.id, 
      tenant: this.selectedDepartmentData.organization,
      branch: this.selectedDepartmentData.branch,
      doctor: this.selectedDoctorData.doctor_id
    }
    this.appointmentService.getDates(payload).subscribe((data)=> {
      if(data){
        console.log(data)
      }
    })
  }

  toggleCalendarVisibility() {
    this.isCalendarVisible = !this.isCalendarVisible;
  }

  isDateEnabled = (date: Date | null): boolean => {
    if (!date) {
      return false;
    }
    const formattedDate = moment(date).format('YYYY-MM-DD');
    return this.dateData.includes(formattedDate);
  };

  onDateSelected(selectedDate: any) {
    this.dateEvent = moment(selectedDate.value).format('YYYY-MM-DD');
    console.log(this.dateEvent);
    this.fetchSlots();
  }

  fetchSlots() {
    const payload = {
      department: this.selectedDepartmentData.id, 
      tenant: this.selectedDepartmentData.organization,
      branch: this.selectedDepartmentData.branch,
      doctor: this.selectedDoctorData.doctor_detail.doctor_id,
      date_slot: this.dateEvent
    }
    this.appointmentService.getSlots(payload).subscribe((data)=> {
      if(data){
        console.log(data)
      }
    })
  }
 
  bookAppointment() {
  //   console.log('Appointment booked:', {
  //     branch: this.selectedBranch,
  //     department: this.selectedDepartment,
  //     doctor: this.selectedDoctor,
  //     date: this.selectedDate,
  //     slot: this.selectedSlot,
  //   });
  }
}
