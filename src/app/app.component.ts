import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogDataComponent } from './dialog-data/dialog-data.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public dialog: MatDialog,) {}
  openPopupChart() {
    this.dialog.open(DialogDataComponent, {
      data : {},
      disableClose: false,
      width: '70%',
    });
  }
}
