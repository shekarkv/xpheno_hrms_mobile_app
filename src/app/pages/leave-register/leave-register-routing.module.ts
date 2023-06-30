import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeaveRegisterPage } from './leave-register.page';

const routes: Routes = [
  {
    path: '',
    component: LeaveRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeaveRegisterPageRoutingModule {}
