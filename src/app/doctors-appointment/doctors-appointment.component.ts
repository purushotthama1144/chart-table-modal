import { Component, Input, OnInit } from '@angular/core';
import { AppointmentService } from './appointment.service';

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
  selectedSlot:any;
  @Input() min: any;
  tomorrow = new Date();

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
      this.availableSlots = this.apiData.date[this.selectedDoctor] || [];
      console.log(this.availableSlots)
    } else {
      this.availableSlots = [];
    }
  }
  isDateEnabled = (date: Date) => {
    const formattedDate = this.formatDate(date);
    return this.availableSlots.includes(formattedDate);
  };

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based
    const day = date.getDate();

    // Ensure leading zeros
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedDay = day < 10 ? `0${day}` : `${day}`;

    return `${formattedMonth}-${formattedDay}-${year}`;
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
