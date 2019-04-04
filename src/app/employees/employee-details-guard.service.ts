import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { EmployeeService } from './employee.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class EmployeeDetailsGuardService implements CanActivate {

  constructor(private _employeService: EmployeeService, private _route: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return this._employeService.getEmployee(+route.paramMap.get('id')).pipe(
      map(employee => {
        const employeeExists = !!employee;

        if (employeeExists) {
          return true;
        } else {
          this._route.navigate(['notFound'])
          return false;
        }
      }),
      catchError((err) => {
        console.log(err);
        return of(false);
      })
    );
  }
}

