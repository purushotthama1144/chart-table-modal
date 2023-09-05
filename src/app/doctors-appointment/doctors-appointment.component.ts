import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AppointmentService } from './appointment.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../snackbar.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-doctors-appointment',
  templateUrl: './doctors-appointment.component.html',
  styleUrls: ['./doctors-appointment.component.css']
})
export class DoctorsAppointmentComponent implements OnInit, AfterViewInit {
  branchData: any;
  selectedBranchData: any;
  departmentData: any;
  selectedDepartmentData: any;
  doctorsData: any;
  selectedDoctorData: any;
  selectedDate: any;
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

  appointmentForm = new FormGroup({
    selectedBranch: new FormControl('', Validators.required),
    selectedDepartment: new FormControl('', Validators.required),
    selectedDoctor: new FormControl('', Validators.required),
    selectedDate: new FormControl('', Validators.required),
    selectedSlot: new FormControl('' , Validators.required),
  });

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

  onBranchSelection(branch:any) {
    this.selectedBranchData = this.branchData.find((val: any) => val.id == branch.value);
    this.appointmentForm.controls['selectedDepartment'].reset();
    this.appointmentForm.controls['selectedDoctor'].reset();
    this.appointmentForm.controls['selectedDate'].reset();
    this.appointmentForm.controls['selectedSlot'].reset();
    this.fetchDepartment();
  }

  fetchDepartment() {
    const payload = {
      branch: this.appointmentForm.value.selectedBranch,
      tenant: this.selectedBranchData.organization
    }

    this.appointmentService.getDepartment(payload).subscribe((data) => {
      if (data) {
        this.departmentData = data.results;
      }
    })
  }

  onDepartmentSelection(department:any) {
    this.selectedDepartmentData = this.departmentData.find((val: any) => val.id == department.value);
    this.appointmentForm.controls['selectedDoctor'].reset();
    this.appointmentForm.controls['selectedDate'].reset();
    this.appointmentForm.controls['selectedSlot'].reset();
    this.fetchDoctors();
  }

  fetchDoctors() {
    const payload = {
      branch: this.appointmentForm.value.selectedBranch,
      department: this.appointmentForm.value.selectedDepartment,
      tenant: this.selectedBranchData.organization,
    }
    this.appointmentService.getDoctors(payload).subscribe((data) => {
      if (data) {
        this.doctorsData = data.results;
      }
    })
  }

  onDoctorSelection(doctor:any) {
    this.selectedDoctorData = this.doctorsData.find((doctorData: any) => doctorData.doctor_detail.doctor_id === doctor.value);
    this.appointmentForm.controls['selectedDate'].reset();
    this.appointmentForm.controls['selectedSlot'].reset();
    this.fetchDates()
  }

  fetchDates() {
    const payload = {
      branch: this.appointmentForm.value.selectedBranch,
      department: this.appointmentForm.value.selectedDepartment,
      tenant: this.selectedBranchData.organization, 
      doctor: this.appointmentForm.value.selectedDoctor
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
    this.appointmentForm.controls['selectedSlot'].reset();
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
      branch: this.appointmentForm.value.selectedBranch,
      department: this.appointmentForm.value.selectedDepartment,
      tenant: this.selectedBranchData.organization, 
      doctor: this.appointmentForm.value.selectedDoctor,
      time_slot: this.appointmentForm.value.selectedSlot,
      date: date,
      lead: 3,
    }

    if((payload.branch != null) && (payload.department != null) &&(payload.tenant != null) 
      && (payload.doctor != null) && (payload.time_slot != null) && (payload.date != null) && (payload.lead != null)) {
      this.appointmentService.saveAppointment(payload).subscribe((data:any) => {
        if(data.status == 201) {
          this.snackbarService.openSnackBar("mat-primary", data.message);
          this.dialogRef.close();
        }
        else {
          this.snackbarService.openSnackBar("mat-primary", data.message);
        }
      })
    } else {
      this.snackbarService.openSnackBar("mat-warn", "Invalid Data");
    }
  }

  fetchAppointmentList() {
    this.appointmentService.getAppointmentList().subscribe((data) => {
      this.appointmentData = data
      this.dataSource = new MatTableDataSource(this.appointmentData.results);
      this.dataSource.paginator = this.paginator;
    })
  }
}