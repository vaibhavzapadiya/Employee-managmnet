// src/app/models/employee.model.ts
export interface Employee {
  tags: never[];
  createdAt: string | number | Date;
pictureUrl: any;

    employeeId: number; // Optional if not provided during creation
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    userName: string;
    password?: string; // Optional if not needed on client side
    designationId?: number;
    mobileNum: string;
    salary: number;
    isActive: boolean;
    isDeleted: boolean;
    createdBy?: string;
    createdDate?: string;
    updatedBy?: string;
    updatedDate?: string;
    departmentId?: number;
    departmentName: string;
   
  }
  export interface DepartmentalReport {
    departmentId: number;
    departmentName: string;
    employeeCount: number;
    averageSalary: number;
    totalSalaryExpense: number;
  }
  export interface salary {
    employeeId: number;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    salary: number;
    departmentName:string;
  }

  export interface Department {
    departmentId: number; // or string, based on your API
    departmentName: string;
    // Add other properties if necessary
  }