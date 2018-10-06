import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../../models/employee';
import { Department } from '../../models/department';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  @ViewChild('employeeForm')
  public createEmployeeForm: NgForm;

  constructor(private employeeService: EmployeeService, private _router: Router) {
    this.datepickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        dateInputFormat: 'DD/MM/YYYY'
      });

  }

  previewPhoto = false;

  employee: Employee;
  datepickerConfig: Partial<BsDatepickerConfig>;

  departments: Department[] = [];

  ngOnInit() {
    this.departments = this.employeeService.getDepartments();
    this.resetEmployee();
  }

  resetEmployee() {
    this.employee = {
      id: null, name: null, email: null, phoneNumber: null, contactPreference: null,
      gender: null, isActive: false, department: '-1', dateOfBirth: null, photoPath: null
    };
  }

  saveEmployee() {
    const emp = JSON.parse(JSON.stringify(this.employee));
    this.employeeService.save(emp);
    this.createEmployeeForm.reset();
    this._router.navigate(['list']);
  }

  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }

}
