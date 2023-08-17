import { Component, ViewChild , OnInit , AfterViewInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { tableData } from './table-data';

@Component({
  selector: 'app-popup-table',
  templateUrl: './popup-table.component.html',
  styleUrls: ['./popup-table.component.css']
})
export class PopupTableComponent implements OnInit , AfterViewInit {
  displayedColumns: string[] = [
    'number',
    'name',
    'symbol',
    'sector',
    'closeprice',
    'gain',
    'healthscore',
  ];

  top25Bullish: MatTableDataSource<any> = new MatTableDataSource<any>();
  bottom25Bullish: MatTableDataSource<any> = new MatTableDataSource<any>();
  top25Bearish: MatTableDataSource<any> = new MatTableDataSource<any>();
  bottom25Bearish: MatTableDataSource<any> = new MatTableDataSource<any>();
  top10Bullish: MatTableDataSource<any> = new MatTableDataSource<any>();
  bottom10Bearish: MatTableDataSource<any> = new MatTableDataSource<any>();

  ngOnInit(): void {
    this.refreshDataSource();
  }

  ngAfterViewInit() {}

  refreshDataSource(){
    this.top25Bullish = new MatTableDataSource(tableData);
    this.bottom25Bullish = new MatTableDataSource(tableData);
    this.top25Bearish = new MatTableDataSource(tableData);
    this.bottom25Bearish = new MatTableDataSource(tableData);
    this.top10Bullish = new MatTableDataSource(tableData);
    this.bottom10Bearish = new MatTableDataSource(tableData);
    
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
  
}
