import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagerDashboardPage } from './manager-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: ManagerDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerDashboardPageRoutingModule {}
