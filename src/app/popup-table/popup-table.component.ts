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

  @ViewChild('top25BullishPaginator') top25BullishPaginator!: MatPaginator;
  @ViewChild('bottom25BullishPaginator') bottom25BullishPaginator!: MatPaginator;
  @ViewChild('top25BearishPaginator') top25BearishPaginator!: MatPaginator;
  @ViewChild('bottom25BearishPaginator') bottom25BearishPaginator!: MatPaginator;
  @ViewChild('top10BullishPaginator') top10BullishPaginator!: MatPaginator;
  @ViewChild('bottom10BearishPaginator') bottom10BearishPaginator!: MatPaginator;

  ngOnInit(): void {
    this.refreshDataSource();
  }

  ngAfterViewInit() {
    this.top25Bullish.paginator = this.top25BullishPaginator;
    this.bottom25Bullish.paginator = this.bottom25BullishPaginator;
    this.top25Bearish.paginator = this.top25BearishPaginator;
    this.bottom25Bearish.paginator = this.bottom25BearishPaginator;
    this.top10Bullish.paginator = this.top10BullishPaginator;
    this.bottom10Bearish.paginator = this.bottom10BearishPaginator;
  }

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
