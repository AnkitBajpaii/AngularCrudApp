import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ListEmployeesComponent } from './employees/list-employee/list-employees.component';
import { CreateEmployeeComponent } from './employees/create-employee/create-employee.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SelectRequiredValidatorDirective } from './shared/select-required-validator.directive';
import { ConfirmEqualValidatorDirective } from './shared/confirm-equal-validator.directive';
import { EmployeeService } from './services/employee.service';
import { DisplayEmployeeComponent } from './employees/display-employee/display-employee.component';
import { CreateEmployeeCanDeactivateGuardService } from './employees/guards/create-employee-can-deactivate-guard';
import { EmployeeDetailsComponent } from './employees/employee-details/employee-details.component';
import { EmployeeListResolverService } from './services/employee-list-resolver.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

const appRoutes: Routes = [
  { path: 'list', component: ListEmployeesComponent, resolve: { employeeList: EmployeeListResolverService } },
  { path: 'edit/:id', component: CreateEmployeeComponent, canDeactivate: [CreateEmployeeCanDeactivateGuardService] },
  { path: 'employees/:id', component: EmployeeDetailsComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    CreateEmployeeComponent,
    SelectRequiredValidatorDirective,
    ConfirmEqualValidatorDirective,
    DisplayEmployeeComponent,
    EmployeeDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    BsDatepickerModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [EmployeeService, CreateEmployeeCanDeactivateGuardService, EmployeeListResolverService],

  bootstrap: [AppComponent]
})
export class AppModule { }
