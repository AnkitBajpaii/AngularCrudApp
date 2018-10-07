import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../../models/employee';
import { Department } from '../../models/department';
import { Router, NavigationExtras } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit {

  @Input()
  showCrudOptions: boolean;

  @Input()
  employee: Employee;

  @Input()
  departments: Department[];

  @Input()
  showBody: boolean;

  @Input()
  isPrevSelected: boolean;

  @Input()
  searchTerm: string;

  @Output()
  notifyDelete: EventEmitter<number> = new EventEmitter<number>();

  constructor(private _router: Router, private employeeService: EmployeeService) { }

  ngOnInit() {
  }

  getDepartmentName(departmentId) {
    const depts = this.departments.find(x => x.id === departmentId);
    if (depts) {
      return depts.name;
    }

    return '';
  }

  navigateToView(): void {
    const extras: NavigationExtras = { queryParams: { 'searchTerm': this.searchTerm } };
    this._router.navigate(['/employees', this.employee.id], extras);
  }

  navigateToEdit(): void {
    this._router.navigate(['/edit', this.employee.id]);
  }

  deleteEmployee(): void {
    if (confirm('Are you sure you want to delete?')) {
      const id = this.employee.id;
      this.employeeService.delete(id);
      this.notifyDelete.emit(id);
    }
  }

  toggleCardBody() {
    this.showBody = !this.showBody;
  }

}
