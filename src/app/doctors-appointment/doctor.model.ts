export interface Branch {
    id: number;
    name: string;
}

export interface Department {
    id: number;
    name: string;
}

export interface Doctor {
    id: number;
    name: string;
    departmentId: number;
}

export interface AppointmentSlot {
    id: number;
    doctorId: number;
    date: Date;
}