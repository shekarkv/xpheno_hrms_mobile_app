import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeaveBalancePage } from './leave-balance.page';

const routes: Routes = [
  {
    path: '',
    component: LeaveBalancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeaveBalancePageRoutingModule {}
