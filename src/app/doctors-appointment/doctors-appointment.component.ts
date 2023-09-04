import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { AppointmentService } from './appointment.service';
import { MatCalendarCellClassFunction, MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../snackbar.service';

@Component({
  selector: 'app-doctors-appointment',
  templateUrl: './doctors-appointment.component.html',
  styleUrls: ['./doctors-appointment.component.css']
})
export class DoctorsAppointmentComponent implements OnInit, AfterViewInit {

  selectedBranch: any;
  branchData: any;
  selectedBranchData: any;
  departmentData: any;
  selectedDepartment: any;
  selectedDepartmentData: any;
  selectedDoctor: any;
  doctorsData: any;
  selectedDoctorData: any;
  selectedDate: any;
  selectedSlot:any;
  availableSlots: any[] = [];
  dateDataNew:any;

  selectedDateData: any;
  isCalendarVisible = false;
  appointmentData: any;
  dateEvent: any;

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

  constructor(private appointmentService: AppointmentService, 
    public dialogRef: MatDialogRef<DoctorsAppointmentComponent>, 
    private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.fetchBranchDetails();
    this.fetchAppointmentList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  fetchBranchDetails() {
    const payload = {
      tenant: 1
    }

    this.appointmentService.getBranch(payload).subscribe((data) => {
      if (data) {
        this.branchData = data.results;
      }
    })
  }

  onBranchSelection() {
    this.selectedBranchData = this.branchData.find((val: any) => val.id == this.selectedBranch);
    this.selectedDepartment = "";
    this.selectedDoctor = "";
    this.fetchDepartment();
  }

  fetchDepartment() {
    const payload = {
      branch: this.selectedBranchData.id,
      tenant: this.selectedBranchData.organization
    }

    this.appointmentService.getDepartment(payload).subscribe((data) => {
      if (data) {
        this.departmentData = data.results;
      }
    })
  }

  onDepartmentSelection() {
    this.selectedDepartmentData = this.departmentData.find((val: any) => val.id == this.selectedDepartment);
    this.selectedDoctor = "";
    this.fetchDoctors();
  }

  fetchDoctors() {
    const payload = {
      department: this.selectedDepartmentData.id,
      tenant: this.selectedDepartmentData.organization,
      branch: this.selectedDepartmentData.branch
    }
    this.appointmentService.getDoctors(payload).subscribe((data) => {
      if (data) {
        this.doctorsData = data.results;
      }
    })
  }

  onDoctorSelection() {
    this.selectedDoctorData = this.doctorsData.find((doctorData: any) => doctorData.doctor_detail.doctor_id === this.selectedDoctor);
    this.fetchDates()
  }

  fetchDates() {
    const payload = {
      department: this.selectedDepartmentData.id,
      tenant: this.selectedDepartmentData.organization,
      branch: this.selectedDepartmentData.branch,
      doctor: this.selectedDoctorData.doctor_detail.doctor_id
    }
    this.appointmentService.getDateSlot(payload).subscribe((data) => {
      if (data) {
        this.dateDataNew = data;
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
    let isEnabled = false;
  
    this.dateDataNew.results.forEach((result:any) => {
      result.available_date_time_slot.forEach((slot:any) => {
        if (slot.from_datetime.includes(formattedDate)) {
          isEnabled = true;
        }
      });
    });
    return isEnabled;
  };

  onDateSelected(selectedDate: any) {
    this.dateEvent = moment(selectedDate.value).format('YYYY-MM-DD');
    this.fetchSlots();
  }

  fetchSlots() {
    this.availableSlots = [];
    this.availableSlots = this.dateDataNew.results.flatMap((result: any) =>
      result.available_date_time_slot.filter((slot: any) =>
        slot.from_datetime.startsWith(this.dateEvent)).map((slot: any) => {
        
          const fromTimeAMPM = this.convertToAMPM(slot.from_time.slice(0, -3));
          const toTimeAMPM = this.convertToAMPM(slot.to_time.slice(0, -3));
  
          return {
            timeSlot: `${fromTimeAMPM} - ${toTimeAMPM}`,
            timeSlotId: slot.time_slot_id
          };
        })
    );
  }

  convertToAMPM(time24: string): string {
    let [hours, minutes] = time24.split(':');
    let period = 'AM';
  
    if (parseInt(hours) >= 12) {
      period = 'PM';
      if (parseInt(hours) > 12) {
        hours = (parseInt(hours) - 12).toString();
      }
    }
  
    return `${hours}:${minutes} ${period}`;
  }

  bookAppointment(selectedDate: Date) {
    const date = moment(selectedDate).format('YYYY-MM-DD');
    const payload = {
      department: this.selectedDepartmentData.id,
      tenant: this.selectedDepartmentData.organization,
      branch: this.selectedBranch,
      doctor: this.selectedDoctorData.doctor_detail.doctor_id,
      time_slot: this.selectedSlot,
      date: date,
      lead: 3,
    }

    this.appointmentService.saveAppointment(payload).subscribe((data:any) => {
      if(data.status == 201) {
        console.log(data)
        this.snackbarService.openSnackBar("mat-primary", data.message);
        this.dialogRef.close();
      }
      else {

      }
    })
  }

  fetchAppointmentList() {
    this.appointmentService.getAppointmentList().subscribe((data) => {
      this.appointmentData = data
      this.dataSource = new MatTableDataSource(this.appointmentData.results);
      console.log(this.dataSource)
      this.dataSource.paginator = this.paginator;
      console.log(this.appointmentData)
    })
  }
}
