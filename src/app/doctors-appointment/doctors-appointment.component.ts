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
  dateData = {
    "results": [
      {
        "id": 3,
        "available_date_time_slot": [
          {
            "from_datetime": "2023-08-30T12:09:53Z",
            "to_datetime": "2023-08-30T12:09:55Z",
            "resting_time": 0,
            "consulting_time": 15,
            "from_time": "12:10:57",
            "to_time": "12:30:58",
            "date_slot_id": 3,
            "time_slot_id": 6
          },
          {
            "from_datetime": "2023-08-30T12:09:53Z",
            "to_datetime": "2023-08-30T12:09:55Z",
            "resting_time": 0,
            "consulting_time": 15,
            "from_time": "12:20:17",
            "to_time": "12:35:24",
            "date_slot_id": 3,
            "time_slot_id": 7
          },
          {
            "from_datetime": "2023-08-30T12:09:53Z",
            "to_datetime": "2023-08-30T12:09:55Z",
            "resting_time": 0,
            "consulting_time": 15,
            "from_time": "13:20:17",
            "to_time": "13:35:24",
            "date_slot_id": 3,
            "time_slot_id": 8
          }
        ]
      },
      {
        "id": 4,
        "available_date_time_slot": [
          {
            "from_datetime": "2023-08-31T12:10:06Z",
            "to_datetime": "2023-08-31T12:10:10Z",
            "resting_time": 0,
            "consulting_time": 15,
            "from_time": "12:10:46",
            "to_time": "12:25:51",
            "date_slot_id": 4,
            "time_slot_id": 9
          }
        ]
      }
    ]
  }

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

  constructor(private appointmentService: AppointmentService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.fetchBranchDetails()
    this.fetchSlots()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  refreshDataSource() {
    this.dataSource = new MatTableDataSource(this.appointmentData);
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
      branch: this.selectedDoctorData.branch,
      doctor: this.selectedDoctorData.doctor_detail.doctor_id
    }
    this.appointmentService.getDateSlot(payload).subscribe((data) => {
      if (data) {
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
  
    this.dateData.results.forEach(result => {
      result.available_date_time_slot.forEach(slot => {
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
    this.availableSlots = this.dateData.results.flatMap(result =>
      result.available_date_time_slot.filter(slot =>
        slot.from_datetime.startsWith(this.dateEvent)).map(slot => ({
          timeSlot: `${slot.from_time.slice(0, -3)} - ${slot.to_time.slice(0, -3)}`,
          timeSlotId: slot.time_slot_id
        })
      )
    );
  }

  bookAppointment(selectedBranch: string , selectedDoctor: string, selectedDate: Date, selectedSlot: number , selectedDepartment: string) {
    const selectedBranchName =  this.branchData.find((branch:any) => branch.id === selectedBranch)?.branch_name;
    const selectedDoctorName = this.doctorsData.find((doctor:any) => doctor.doctor_detail.doctor_id === selectedDoctor)?.doctor_detail.doctor_name;
    const selectedSlotInfo = this.availableSlots.find((slot:any) => slot.timeSlotId === selectedSlot)?.timeSlot;
    const department = this.departmentData.find((department:any) => department.id === selectedDepartment)?.department_title;
    const date = moment(selectedDate).format('YYYY-MM-DD');
 
    console.log("With Setails:" , selectedBranchName , department , selectedDoctorName , date , selectedSlotInfo)
    console.log('With Only ID:', {
        branch: this.selectedBranch,
        department: this.selectedDepartment,
        doctor: this.selectedDoctor,
        date: this.selectedDate,
        slot: this.selectedSlot,
      });
  }
}
