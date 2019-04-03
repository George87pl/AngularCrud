import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { EmployeeService } from './employee.service';
import { Injectable } from '@angular/core';

@Injectable()
export class EmployeeDetailsGuardService implements CanActivate {

  constructor(private _employeService: EmployeeService, private _route: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const employeeExists = !!this._employeService.getEmployee(+route.paramMap.get('id'))

    if (employeeExists) {
      return true;
    } else {
      this._route.navigate(['notFound'])
      return false;
    }
  }
}
