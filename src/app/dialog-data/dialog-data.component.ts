import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-data',
  templateUrl: './dialog-data.component.html',
  styleUrls: ['./dialog-data.component.css']
})
export class DialogDataComponent {
  chartLoaded = false;
  date: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,) { 
    this.date = this.data.data
  }
  
  onAllChartLoad(loaded: boolean) {
    this.chartLoaded = loaded;
  }
}
