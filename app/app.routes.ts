import { Routes,CanActivate } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { EmployeePerformanceChartComponent } from './employee-performance-chart/employee-performance-chart.component';

import { DepartmentreportComponent } from './departmentreport/departmentreport.component';
import { VisuilizationComponent } from './visuilization/visuilization.component';
import { SalaryReportComponent } from './salary-report/salary-report.component';
import { DepartmentDetailsComponent } from './department-details/department-details.component';
import { OverviewComponent } from './overview/overview.component';
import { AuthGuard } from '../app/auth.guard';
import { EmployeeModalComponent } from './employee-modal/employee-modal.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { ProfileComponent } from './profile/profile.component';
import { ProjectComponent } from './project/project.component';




export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'employees',
    component: EmployeeListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin','User'] }
  },
  {
    path: 'add-employee',
    component: AddEmployeeComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'edit/:id',
    component: EditEmployeeComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'User'] }
  },
  {
    path: 'department-report',
    component: DepartmentreportComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'visualize-report',
    component: VisuilizationComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'salary-report',
    component: SalaryReportComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'department-details/:id',
    component: DepartmentDetailsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'User'] }
  },
  {
    path: 'overview',
    component: OverviewComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'User'] }
  },
  {
    path: 'modal/:id',
    component: EmployeeModalComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent// Component to show unauthorized access message
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard], // Protect this route
    data: { roles: ['Admin', 'User'] } // Allow access to Admins and Users
  },
  {
    path: 'project',
    component: ProjectComponent,
    canActivate: [AuthGuard], // Protect this route
    data: { roles: ['Admin', 'User'] } // Allow access to Admins and Users
  }
]
