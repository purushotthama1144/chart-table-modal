import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogDataComponent } from '../dialog-data/dialog-data.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-get-insights-date',
  templateUrl: './get-insights-date.component.html',
  styleUrls: ['./get-insights-date.component.css']
})
export class GetInsightsDateComponent {
  selectedDate:any;
  dateFieldTouched:any;

  constructor(public dialog: MatDialog, private datePipe: DatePipe) {}

  onClosed(formControl:any){
    this.dateFieldTouched = formControl.control.markAsTouched();
  }

  openPopupChart() {
    this.selectedDate = this.datePipe.transform(this.selectedDate, 'shortDate');
    if (this.selectedDate == undefined) {
      alert("Date is required");
    } else {
      this.dialog.open(DialogDataComponent, {
        data: {
          data: this.selectedDate,
        },
        disableClose: false,
        width: '70%',
      });
    }
  }
}
