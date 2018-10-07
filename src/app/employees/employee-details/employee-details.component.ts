import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private _employeeService: EmployeeService, private _router: Router, private _activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this._employeeService.getDepartments().subscribe(x => {
      this.departments = x;
    });

    this._activatedRoute.paramMap.subscribe(x => {
      const id = +x.get('id');

      this._employeeService.getEmployeeById(id).subscribe(y => {
        this.employee = y;
      });
    });
  }

  goBack() {
    if (this.employee) {
      this._router.navigate(['/list', { id: this.employee.id }], { queryParamsHandling: 'preserve' });
    } else {
      this._router.navigate(['/list']);
    }

  }

}
