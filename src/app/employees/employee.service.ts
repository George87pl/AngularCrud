import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class EmployeeService {

  private listEmployees: Employee[] = [
    {
      id: 1,
      name: 'Mark',
      gender: 'Male',
      contactPreference: 'Email',
      email: 'mark@gamil.com',
      dateOfBirth: new Date('10/25/1988'),
      department: '3',
      isActive: true,
      photoPath: 'assets/images/1.png'
    },
    {
      id: 2,
      name: 'Mary',
      gender: 'Female',
      contactPreference: 'Phone',
      phoneNumber: 123456789,
      dateOfBirth: new Date('11/20/1979'),
      department: '2',
      isActive: true,
      photoPath: 'assets/images/2.png'
    },
    {
      id: 3,
      name: 'John',
      gender: 'Male',
      contactPreference: 'Phone',
      phoneNumber: 987654321,
      dateOfBirth: new Date('3/25/1976'),
      department: '3',
      isActive: false,
      photoPath: 'assets/images/3.png'
    }
  ];

  getEmployees(): Observable<Employee[]> {
    return of(this.listEmployees).pipe(delay(2000));
  }

  getEmployee(id: number): Employee {
    return this.listEmployees.find(em => em.id === id);
  }

  save(employee: Employee) {

    if (employee.id === null) {
      if (this.listEmployees.length > 0) {
        const maxId = this.listEmployees.reduce(function(e1, e2) {
          return (e1.id > e2.id) ? e1 : e2;
        }).id;

        employee.id = maxId + 1;
      } else {
        employee.id = 1;
      }
      this.listEmployees.push(employee);
    } else {
      const foundIndex = this.listEmployees.findIndex(e => e.id === employee.id);
      this.listEmployees[foundIndex] = employee;
    }
  }

  deleteEmployee(id: number) {
    const i = this.listEmployees.findIndex(e => e.id === id);
    if (i !== -1) {
      this.listEmployees.splice(i, 1);
    }
  }
}
