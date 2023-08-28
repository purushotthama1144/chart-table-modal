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
  day: {
    [time:string]:any[];
  }
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
  day: {
    '21-08-2023': ['9-10', '10-11', '11-12', '12-1'],
    '23-08-2023': ['9-10', '10-11', '11-12', '3-4'],
    '24-08-2023': ['11-12', '10-11', '1-2', '3-4'],
  }
};

const appointmantDetails = [
  {
    'department':'General',
    'doctorName':'Purushotham',
    'date':'28/08/2023',
    'slotTime':'1:00 PM',
    'patientName':'Alpine Desouja',
    'patientContact':'1234567890',
    'patientAge':'35',
  },
  {
    'department':'General',
    'doctorName':'Purushotham',
    'date':'28/08/2023',
    'slotTime':'1:00 PM',
    'patientName':'Alpine Desouja',
    'patientContact':'1234567890',
    'patientAge':'35',
  },
  {
    'department':'General',
    'doctorName':'Purushotham',
    'date':'28/08/2023',
    'slotTime':'1:00 PM',
    'patientName':'Alpine Desouja',
    'patientContact':'1234567890',
    'patientAge':'35',
  },
  {
    'department':'General',
    'doctorName':'Purushotham',
    'date':'28/08/2023',
    'slotTime':'1:00 PM',
    'patientName':'Alpine Desouja',
    'patientContact':'1234567890',
    'patientAge':'35',
  },
  {
    'department':'General',
    'doctorName':'Purushotham',
    'date':'28/08/2023',
    'slotTime':'1:00 PM',
    'patientName':'Alpine Desouja',
    'patientContact':'1234567890',
    'patientAge':'35',
  },
  {
    'department':'General',
    'doctorName':'Purushotham',
    'date':'28/08/2023',
    'slotTime':'1:00 PM',
    'patientName':'Alpine Desouja',
    'patientContact':'1234567890',
    'patientAge':'35',
  },
  {
    'department':'General',
    'doctorName':'Purushotham',
    'date':'28/08/2023',
    'slotTime':'1:00 PM',
    'patientName':'Alpine Desouja',
    'patientContact':'1234567890',
    'patientAge':'35',
  },
  {
    'department':'General',
    'doctorName':'Purushotham',
    'date':'28/08/2023',
    'slotTime':'1:00 PM',
    'patientName':'Alpine Desouja',
    'patientContact':'1234567890',
    'patientAge':'35',
  },
  {
    'department':'General',
    'doctorName':'Purushotham',
    'date':'28/08/2023',
    'slotTime':'1:00 PM',
    'patientName':'Alpine Desouja',
    'patientContact':'1234567890',
    'patientAge':'35',
  },
  {
    'department':'General',
    'doctorName':'Purushotham',
    'date':'28/08/2023',
    'slotTime':'1:00 PM',
    'patientName':'Alpine Desouja',
    'patientContact':'1234567890',
    'patientAge':'35',
  },
  {
    'department':'General',
    'doctorName':'Purushotham',
    'date':'28/08/2023',
    'slotTime':'1:00 PM',
    'patientName':'Alpine Desouja',
    'patientContact':'1234567890',
    'patientAge':'35',
  },
  {
    'department':'General',
    'doctorName':'Purushotham',
    'date':'28/08/2023',
    'slotTime':'1:00 PM',
    'patientName':'Alpine Desouja',
    'patientContact':'1234567890',
    'patientAge':'35',
  },
  {
    'department':'General',
    'doctorName':'Purushotham',
    'date':'28/08/2023',
    'slotTime':'1:00 PM',
    'patientName':'Alpine Desouja',
    'patientContact':'1234567890',
    'patientAge':'35',
  },
  {
    'department':'General',
    'doctorName':'Purushotham',
    'date':'28/08/2023',
    'slotTime':'1:00 PM',
    'patientName':'Alpine Desouja',
    'patientContact':'1234567890',
    'patientAge':'35',
  },
  {
    'department':'General',
    'doctorName':'Purushotham',
    'date':'28/08/2023',
    'slotTime':'1:00 PM',
    'patientName':'Alpine Desouja',
    'patientContact':'1234567890',
    'patientAge':'35',
  },
  {
    'department':'General',
    'doctorName':'Purushotham',
    'date':'28/08/2023',
    'slotTime':'1:00 PM',
    'patientName':'Alpine Desouja',
    'patientContact':'1234567890',
    'patientAge':'35',
  },
  {
    'department':'General',
    'doctorName':'Purushotham',
    'date':'28/08/2023',
    'slotTime':'1:00 PM',
    'patientName':'Alpine Desouja',
    'patientContact':'1234567890',
    'patientAge':'35',
  },
  {
    'department':'General',
    'doctorName':'Purushotham',
    'date':'28/08/2023',
    'slotTime':'1:00 PM',
    'patientName':'Alpine Desouja',
    'patientContact':'1234567890',
    'patientAge':'35',
  },
  {
    'department':'General',
    'doctorName':'Purushotham',
    'date':'28/08/2023',
    'slotTime':'1:00 PM',
    'patientName':'Alpine Desouja',
    'patientContact':'1234567890',
    'patientAge':'35',
  },
  {
    'department':'General',
    'doctorName':'Purushotham',
    'date':'28/08/2023',
    'slotTime':'1:00 PM',
    'patientName':'Alpine Desouja',
    'patientContact':'1234567890',
    'patientAge':'35',
  },
  {
    'department':'General',
    'doctorName':'Purushotham',
    'date':'28/08/2023',
    'slotTime':'1:00 PM',
    'patientName':'Alpine Desouja',
    'patientContact':'1234567890',
    'patientAge':'35',
  },
  {
    'department':'General',
    'doctorName':'Purushotham',
    'date':'28/08/2023',
    'slotTime':'1:00 PM',
    'patientName':'Alpine Desouja',
    'patientContact':'1234567890',
    'patientAge':'35',
  },
  {
    'department':'General',
    'doctorName':'Purushotham',
    'date':'28/08/2023',
    'slotTime':'1:00 PM',
    'patientName':'Alpine Desouja',
    'patientContact':'1234567890',
    'patientAge':'35',
  },
  {
    'department':'General',
    'doctorName':'Purushotham',
    'date':'28/08/2023',
    'slotTime':'1:00 PM',
    'patientName':'Alpine Desouja',
    'patientContact':'1234567890',
    'patientAge':'35',
  },
  {
    'department':'General',
    'doctorName':'Purushotham',
    'date':'28/08/2023',
    'slotTime':'1:00 PM',
    'patientName':'Alpine Desouja',
    'patientContact':'1234567890',
    'patientAge':'35',
  },
  {
    'department':'General',
    'doctorName':'Purushotham',
    'date':'28/08/2023',
    'slotTime':'1:00 PM',
    'patientName':'Alpine Desouja',
    'patientContact':'1234567890',
    'patientAge':'35',
  },
  {
    'department':'General',
    'doctorName':'Purushotham',
    'date':'28/08/2023',
    'slotTime':'1:00 PM',
    'patientName':'Alpine Desouja',
    'patientContact':'1234567890',
    'patientAge':'35',
  },
  {
    'department':'General',
    'doctorName':'Purushotham',
    'date':'28/08/2023',
    'slotTime':'1:00 PM',
    'patientName':'Alpine Desouja',
    'patientContact':'1234567890',
    'patientAge':'35',
  },
  {
    'department':'General',
    'doctorName':'Purushotham',
    'date':'28/08/2023',
    'slotTime':'1:00 PM',
    'patientName':'Alpine Desouja',
    'patientContact':'1234567890',
    'patientAge':'35',
  },
  {
    'department':'General',
    'doctorName':'Purushotham',
    'date':'28/08/2023',
    'slotTime':'1:00 PM',
    'patientName':'Alpine Desouja',
    'patientContact':'1234567890',
    'patientAge':'35',
  },
  {
    'department':'General',
    'doctorName':'Purushotham',
    'date':'28/08/2023',
    'slotTime':'1:00 PM',
    'patientName':'Alpine Desouja',
    'patientContact':'1234567890',
    'patientAge':'35',
  },
  {
    'department':'General',
    'doctorName':'Purushotham',
    'date':'28/08/2023',
    'slotTime':'1:00 PM',
    'patientName':'Alpine Desouja',
    'patientContact':'1234567890',
    'patientAge':'35',
  },
  {
    'department':'General',
    'doctorName':'Purushotham',
    'date':'28/08/2023',
    'slotTime':'1:00 PM',
    'patientName':'Alpine Desouja',
    'patientContact':'1234567890',
    'patientAge':'35',
  },
  {
    'department':'General',
    'doctorName':'Purushotham',
    'date':'28/08/2023',
    'slotTime':'1:00 PM',
    'patientName':'Alpine Desouja',
    'patientContact':'1234567890',
    'patientAge':'35',
  },
  {
    'department':'General',
    'doctorName':'Purushotham',
    'date':'28/08/2023',
    'slotTime':'1:00 PM',
    'patientName':'Alpine Desouja',
    'patientContact':'1234567890',
    'patientAge':'35',
  },
]

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private dummyDataSubject = new BehaviorSubject<BranchesData>(dummyData);
  private appointment = new BehaviorSubject<any>(appointmantDetails);

  getDummyData(): Observable<BranchesData> {
    return this.dummyDataSubject.asObservable();
  }

  getAppointmenntDetails() : Observable<any> {
    return this.appointment.asObservable();
  }
}
