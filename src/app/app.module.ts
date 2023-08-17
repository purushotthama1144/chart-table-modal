import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { ChecklistDatabase, TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatTreeModule} from '@angular/material/tree';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import { NgGanttEditorModule } from 'ng-gantt';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PopupChartComponent } from './popup-chart/popup-chart.component';
import { PopupTableComponent } from './popup-table/popup-table.component';
import { DialogDataComponent } from './dialog-data/dialog-data.component';

@NgModule({
  declarations: [
    AppComponent,  
    ChartComponent,
    TableComponent,
    PopupChartComponent,
    PopupTableComponent,
    DialogDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTreeModule,
    MatDialogModule,
    MatPaginatorModule,
    MatCardModule,
    NgApexchartsModule,
    NgGanttEditorModule,
    
  ],
  providers: [ChecklistDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
