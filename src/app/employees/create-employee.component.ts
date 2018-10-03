import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee';
import { Department } from '../models/department';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  constructor() {
    this.datepickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        dateInputFormat: 'DD/MM/YYYY'
      });

  }

  previewPhoto = false;

  employee: Employee;
  datepickerConfig: Partial<BsDatepickerConfig>;

  departments: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Payroll' },
    { id: 5, name: 'Admin' }
  ];

  ngOnInit() {
    this.resetEmployee();
  }

  resetEmployee() {
    this.employee = {
      id: null, name: null, email: null, phoneNumber: null, contactPreference: null,
      gender: null, isActive: false, department: '-1', dateOfBirth: null, photoPath: null
    };
  }

  saveEmployee() {
  }

  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }

}
