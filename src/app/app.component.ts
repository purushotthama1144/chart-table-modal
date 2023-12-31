import { Component, OnInit } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { DialogDataComponent } from './dialog-data/dialog-data.component';
import { GetInsightsDateComponent } from './get-insights-date/get-insights-date.component';
import { DoctorsAppointmentComponent } from './doctors-appointment/doctors-appointment.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(public dialog: MatDialog,) {}

  ngOnInit(): void {
  }

  openModal(event:any) {
    const dialogPosition: DialogPosition = {
      top: event.y + 'px',
      right: event.x + 'px'
    };

    this.dialog.open(DoctorsAppointmentComponent, {
      disableClose: true,
      width: '70%',
      autoFocus: false, 
      restoreFocus: false,
      position:dialogPosition,
    
    });
  }
}
