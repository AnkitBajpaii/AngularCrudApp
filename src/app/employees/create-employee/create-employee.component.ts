import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../../models/employee';
import { Department } from '../../models/department';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { EmployeeService } from '../../services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  @ViewChild('employeeForm')
  public createEmployeeForm: NgForm;
  panelTitle: string;

  constructor(private employeeService: EmployeeService, private _router: Router, private _activatedRoute: ActivatedRoute) {
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
    this.employeeService.getDepartments().subscribe(x => {
      this.departments = x;
    });

    this._activatedRoute.paramMap.subscribe(x => {
      const id = +x.get('id');
      if (id !== 0) {
        this.panelTitle = 'Edit';
        this.employeeService.getEmployeeById(id).subscribe(y => {
          this.employee = JSON.parse(JSON.stringify(y));
        });
      } else {
        this.panelTitle = 'Create';
        this.resetEmployee();
      }

    });
  }

  resetEmployee() {
    this.employee = {
      id: null, name: null, email: null, phoneNumber: null, contactPreference: null,
      gender: null, isActive: false, department: '-1', dateOfBirth: null, photoPath: null
    };
    this.createEmployeeForm.reset();
  }

  saveEmployee() {
    const emp = JSON.parse(JSON.stringify(this.employee));
    if (!emp.id) {
      this.employeeService.save(emp);
    } else {
      this.employeeService.update(emp);
    }

    this.createEmployeeForm.reset();
    this._router.navigate(['list']);
  }

  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }

}
