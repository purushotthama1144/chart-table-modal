import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogDataComponent } from './dialog-data/dialog-data.component';
import { GetInsightsDateComponent } from './get-insights-date/get-insights-date.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public dialog: MatDialog,) {}

  openModal() {
    this.dialog.open(GetInsightsDateComponent, {
      disableClose: false,
      width: '50%',
    });
  }
}
