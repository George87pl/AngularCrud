import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs';
import { EmployeeService } from './employee.service';
import { Injectable } from '@angular/core';

@Injectable()
export class EmployeeListResorverService implements Resolve<Employee[]> {

  constructor(private _employeService: EmployeeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee[]> {
    return this._employeService.getEmployees();
  }
}
