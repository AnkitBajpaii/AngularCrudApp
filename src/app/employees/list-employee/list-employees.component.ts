import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { Department } from '../../models/department';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  employees: Employee[];
  filteredEmployees: Employee[];
  departments: Department[] = [];
  employeeIdToHighlight: number;

  private _searchTerm: string;
  get searchTerm() {
    return this._searchTerm;
  }

  set searchTerm(val: string) {
    this._searchTerm = val;

    if (this._searchTerm === null || this._searchTerm.trim() === '') {
      this.filteredEmployees = this.employees;
    } else {
      this.filteredEmployees = this.employees.filter(x => x.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1);
    }

  }
  constructor(private employeeService: EmployeeService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.departments = this.employeeService.getDepartments();
    this.employees = this.employeeService.getEmployees();
    this.filteredEmployees = this.employees;
    this._activatedRoute.paramMap.subscribe(x => {
      this.employeeIdToHighlight = +x.get('id');
    });
  }

}
