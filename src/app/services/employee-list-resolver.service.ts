import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { Observable } from 'rxjs';
import { EmployeeService } from './employee.service';

@Injectable()
export class EmployeeListResolverService implements Resolve<Employee[]> {

    constructor(private employeeService: EmployeeService) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee[]> {
        return this.employeeService.getEmployees();
    }
}
