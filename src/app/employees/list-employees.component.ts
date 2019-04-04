import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ResolvedEmployeeList } from './resolved-employeelist.model';

@Component({
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  employees: Employee[];
  filteredEmployees: Employee[];
  private _searchTerm: string;
  error: string;

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(val: string) {
    this._searchTerm = val;
    this.filteredEmployees = this.filtereEmployees(val);
  }

  filtereEmployees(searchString: string) {
    return this.employees.filter(e => e.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  constructor(
    private _router: Router,
    private _route: ActivatedRoute) {

    const resolvedData: Employee[] | string = this._route.snapshot.data['employeeList'];

    if (Array.isArray(resolvedData)) {
      this.employees = resolvedData;
    } else {
      this.error = resolvedData;
    }

    if (this._route.snapshot.queryParamMap.has('searchTerm')) {
      this._searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
      this.filteredEmployees = this.filtereEmployees(this._searchTerm);
    } else {
      this.filteredEmployees = this.employees;
    }
  }

  handleDelete(id: number) {

    const i = this.filteredEmployees.findIndex(e => e.id === id);
    if (i !== -1) {
      this.filteredEmployees.splice(i, 1);
    }
  }

  ngOnInit() {
  }
}
