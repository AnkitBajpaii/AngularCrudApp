import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { Department } from '../models/department';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class EmployeeService {

    private employees: Employee[] = [
        {
            id: 1,
            name: 'Mark',
            gender: 'male',
            contactPreference: 'email',
            email: 'mark@pragimtech.com',
            dateOfBirth: new Date('10/25/1988'),
            department: '3',
            isActive: true,
            photoPath: 'assets/images/mark.png'
        },
        {
            id: 2,
            name: 'Mary',
            gender: 'female',
            contactPreference: 'phone',
            phoneNumber: 2345978640,
            dateOfBirth: new Date('11/20/1979'),
            department: '2',
            isActive: true,
            photoPath: 'assets/images/mary.png'
        },
        {
            id: 3,
            name: 'John',
            gender: 'male',
            contactPreference: 'phone',
            phoneNumber: 5432978640,
            dateOfBirth: new Date('3/25/1976'),
            department: '3',
            isActive: false,
            photoPath: 'assets/images/john.png'
        }
    ];

    private departments: Department[] = [
        { id: '1', name: 'Help Desk' },
        { id: '2', name: 'HR' },
        { id: '3', name: 'IT' },
        { id: '4', name: 'Payroll' },
        { id: '5', name: 'Admin' }
    ];

    getDepartments(): Observable<Department[]> {
        return of(this.departments);
    }

    getEmployees(): Observable<Employee[]> {
        return of(this.employees).pipe(delay(2000));
    }

    getEmployeeById(id: number): Observable<Employee> {
        return of(this.employees.find(e => e.id === id));
    }

    save(employee: Employee) {
        const maxId = this.employees.reduce((e1, e2) => {
            return (e1.id > e2.id) ? e1 : e2;
        }).id;

        employee.id = maxId + 1;
        this.employees.push(employee);
    }

    update(employee: Employee) {
        const index = this.employees.findIndex(e => e.id === employee.id);
        if (index !== -1) {
            this.employees[index] = employee;
        }
    }

    delete(id: number) {
        const i = this.employees.findIndex(e => e.id === id);
        if (i !== -1) {
            this.employees.splice(i, 1);
        }
    }
}
