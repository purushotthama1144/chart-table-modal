import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  baseUrl = "http://192.168.132.225:8000/api/"

  constructor(private http: HttpClient) {}

  getBranch(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}micro-branch/list/` , data)
  }

  getDepartment(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}micro-department/list/` , data)
  }

  getDoctors(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}micro-doctors/list/` , data) 
  }

  getDates(data:any){
    return this.http.post(`${this.baseUrl}micro-appointment-slot/list/` , data)
  }

  getSlots(data:any){
    return this.http.post(`${this.baseUrl}micro-appointment-slot/list/` , data)
  }

}
