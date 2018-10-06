import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { Department } from '../../models/department';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  employee: Employee;
  departments: Department[];

  constructor(private _employeeService: EmployeeService, private _activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.departments = this._employeeService.getDepartments();
    this._activatedRoute.paramMap.subscribe(x => {
      const id = +x.get('id');

      this.employee = this._employeeService.getEmployeeById(id);
    });
  }

}
