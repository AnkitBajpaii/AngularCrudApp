import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { Department } from '../../models/department';
import { ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

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
  constructor(private employeeService: EmployeeService, private _activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {

    this.employeeService.getDepartments().subscribe(x => {
      this.departments = x;
    });

    // Uncomment when you are not using route resolver for employee list component
    // this.employeeService.getEmployees().subscribe(x => {
    //   this.employees = x;
    //   this.filteredEmployees = this.employees;

    //   this._activatedRoute.queryParamMap.subscribe(y => {
    //     this.searchTerm = y.get('searchTerm');
    //   });

    // });

    this.employees = this._activatedRoute.snapshot.data['employeeList'];
    this.filteredEmployees = this.employees;

    this._activatedRoute.queryParamMap.subscribe(y => {
      this.searchTerm = y.get('searchTerm');
    });

    this._activatedRoute.paramMap.subscribe(x => {
      this.employeeIdToHighlight = +x.get('id');
    });
  }

  handleDelete(id: number) {
    const i = this.filteredEmployees.findIndex(e => e.id === id);
    if (i !== -1) {
      this.filteredEmployees.splice(i, 1);
    }

  }

}
