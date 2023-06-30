import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeProfileEditPage } from './employee-profile-edit.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeeProfileEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeProfileEditPageRoutingModule {}
