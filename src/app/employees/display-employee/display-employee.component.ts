import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../../models/employee';
import { Department } from '../../models/department';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit {

  @Input()
  allowBack: boolean;

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

  constructor(private _router: Router) { }

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
    this._router.navigate(['/employees', this.employee.id]);
  }

  navigateToEdit(): void {
    this._router.navigate(['/create']);
  }

  navigateToDelete(): void {
  }

  toggleCardBody() {
    this.showBody = !this.showBody;
  }

  goBack() {
    this._router.navigate(['/list', { id: this.employee.id }]);
  }

}
