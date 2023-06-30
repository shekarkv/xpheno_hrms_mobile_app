import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeaveDetailsPage } from './leave-details.page';

const routes: Routes = [
  {
    path: '',
    component: LeaveDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeaveDetailsPageRoutingModule {}
