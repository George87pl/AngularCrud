import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { CreateEmployeeComponent } from './employees/create-employee.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SelectRequiredValidatorDirective } from './shared/select-required-validator.directive';
import { ConfirmEqualValidatorDirective } from './shared/confirm-equal-validator.directive';
import { EmployeeService } from './employees/employee.service';
import { DisplayEmployeeComponent } from './employees/display-employee.component';
import { CreateEmployeeCanDeactivateGuardService } from './employees/create-employee-can-deactivate-guard.service';
import { EmployeeDetailsComponent } from './employees/employee-details.component';
import { EmployeeFilterPipe } from './employees/employee-filter.pipe';
import { EmployeeListResorverService } from './employees/employee-list-resorver.service';
import { PageNotFoundComponent } from './page-not-found.component';
import { EmployeeDetailsGuardService } from './employees/employee-details-guard.service';
import { AccordionComponent } from './shared/accordion.component';

const appRoutes: Routes = [
  {
    path: 'list',
    component: ListEmployeesComponent,
    resolve: { employeeList: EmployeeListResorverService }
  },
  {
    path: 'edit/:id',
    component: CreateEmployeeComponent,
    canDeactivate: [CreateEmployeeCanDeactivateGuardService]
  },
  {
    path: 'employees/:id',
    component: EmployeeDetailsComponent,
    canActivate: [EmployeeDetailsGuardService]
  },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'notFound', component: PageNotFoundComponent }
  ];

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    CreateEmployeeComponent,
    SelectRequiredValidatorDirective,
    ConfirmEqualValidatorDirective,
    DisplayEmployeeComponent,
    EmployeeDetailsComponent,
    EmployeeFilterPipe,
    PageNotFoundComponent,
    AccordionComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [
    EmployeeService,
    CreateEmployeeCanDeactivateGuardService,
    EmployeeListResorverService,
    EmployeeDetailsGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
