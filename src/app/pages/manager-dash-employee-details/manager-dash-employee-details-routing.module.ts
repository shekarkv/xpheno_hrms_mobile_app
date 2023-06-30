import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagerDashEmployeeDetailsPage } from './manager-dash-employee-details.page';

const routes: Routes = [
  {
    path: '',
    component: ManagerDashEmployeeDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerDashEmployeeDetailsPageRoutingModule {}
