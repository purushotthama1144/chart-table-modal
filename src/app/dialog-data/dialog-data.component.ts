import { Component } from '@angular/core';

@Component({
  selector: 'app-dialog-data',
  templateUrl: './dialog-data.component.html',
  styleUrls: ['./dialog-data.component.css']
})
export class DialogDataComponent {
  chartLoaded = false;
  date: any;

  constructor(){
    this.date = Date.now();
  }
  
  onAllChartLoad(loaded: boolean) {
    this.chartLoaded = loaded;
  }
}
