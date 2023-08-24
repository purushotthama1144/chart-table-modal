import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

interface BranchesData {
  branches: string[];
  departments: {
    [branch: string]: string[];
  };
  doctors: {
    [department: string]: string[];
  };
  date: {
    [doctor: string]: string[];
  };
}

const dummyData: BranchesData = {
  branches: ["Branch A", "Branch B", "Branch C"],
  departments: {
    "Branch A": ["Department 1", "Department 2"],
    "Branch B": ["Department 3", "Department 4"],
    "Branch C": ["Department 5", "Department 6"]
  },
  doctors: {
    "Department 1": ["Doctor A", "Doctor B"],
    "Department 2": ["Doctor C", "Doctor D"],
    "Department 3": ["Doctor E", "Doctor F"],
    "Department 4": ["Doctor G", "Doctor H"],
    "Department 5": ["Doctor I", "Doctor J"],
    "Department 6": ["Doctor K", "Doctor L"]
  },
  date: {
    "Doctor A": ['21-08-2023', '23-08-2023', '24-08-2023', '25-08-2023'],
    "Doctor B": ['23-08-2023', '24-08-2023', '25-08-2023', '26-08-2023'],
    "Doctor C": ['22-08-2023', '24-08-2023', '25-08-2023', '26-08-2023'],
    "Doctor D": [],
    "Doctor E": [],
    "Doctor F": [],
    "Doctor G": [],
    "Doctor H": [],
    "Doctor I": [],
    "Doctor J": [],
    "Doctor K": ['22-08-2023', '24-08-2023', '25-08-2023', '26-08-2023'],
    "Doctor L": ['22-08-2023', '24-08-2023', '25-08-2023', '26-08-2023'],
},
};

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private dummyDataSubject = new BehaviorSubject<BranchesData>(dummyData);

  getDummyData(): Observable<BranchesData> {
    return this.dummyDataSubject.asObservable();
  }
}
