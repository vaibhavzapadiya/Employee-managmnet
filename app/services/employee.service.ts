import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { DepartmentalReport, Employee,  } from '../models/Employee.models';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'https://localhost:7149/api/Employee'; // Update with your API endpoint

  constructor(private http: HttpClient) {}

  // Fetch employees with pagination
  getEmployees(pageNumber: number, pageSize: number, searchTerm: string = '', departmentId: number | null = null): Observable<any> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('searchTerm', searchTerm)
      .set('departmentId', departmentId?.toString() || '');

    return this.http.get<any>('https://localhost:7149/api/Employee', { params });
  }

  // Fetch a single employee by ID
  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  // Update an existing employee
  updateEmployee(userId: number, employee: Employee): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}`, employee);
  }

  // Delete an employee
  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getTotalEmployeeCount(searchTerm?: string, departmentId?: number | null): Observable<number> {
    let params = new HttpParams();
    if (searchTerm) {
      params = params.set('searchTerm', searchTerm);
    }
    if (departmentId !== undefined && departmentId !== null) {
      params = params.set('departmentId', departmentId.toString());
    }

    return this.http.get<number>(`${this.apiUrl}/totalcount`, { params });
  }
  getTotalUsers(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/users/total`);
  }
  
  getLatestUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users/latest`);
  }
  
  getAllRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/roles`);
  }
  getDepartmentEmployeeCounts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/employees/department-counts`);
  }
  
  getDepartmentPerformance(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/employees/department-performance`);
  }

  getDepartmentalReport(): Observable<DepartmentalReport[]> {
    return this.http.get<DepartmentalReport[]>(`https://localhost:7149/api/Employee/departmental-report`);
  }
  

  downloadDepartmentalReportPdf(): Observable<Blob> {
    return this.http.get(`https://localhost:7149/api/Download/departmental-report/download`, {
      responseType: 'blob'
    });
  }
  getEmployeeCountByGender(): Observable<any> {
    return this.http.get(`https://localhost:7149/api/DataVisulize/count-by-gender
`);
  }

  getAverageSalaryByDepartment(): Observable<any> {
    return this.http.get(`https://localhost:7149/api/DataVisulize/average-salary-by-department`);

}

getFilteredEmployees(minSalary?: number, maxSalary?: number): Observable<Employee[]> {
  let params = new HttpParams();
  if (minSalary !== undefined && minSalary !== null) {
    params = params.set('minSalary', minSalary.toString());
  }
  if (maxSalary !== undefined && maxSalary !== null) {
    params = params.set('maxSalary', maxSalary.toString());
  }

  return this.http.get<Employee[]>('https://localhost:7149/api/Download', { params });
}
getEmployeess(departmentId: number): Observable<Employee[]> {
  return this.http.get<Employee[]>(`https://localhost:7149/api/Employee/department/${departmentId}`)
   
}
getDepartments(): Observable<DepartmentalReport[]> {
  return this.http.get<DepartmentalReport[]>(`https://localhost:7149/api/Employee/department`)
    ;
}
checkEmailExists(email: string): Observable<boolean> {
  return this.http.get<boolean>(`${this.apiUrl}/check-email?email=${email}`);
}

checkUsernameExists(username: string): Observable<boolean> {
  return this.http.get<boolean>(`${this.apiUrl}/check-username?username=${username}`);
}

}