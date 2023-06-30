import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewApplyLeavePage } from './view-apply-leave.page';

const routes: Routes = [
  {
    path: '',
    component: ViewApplyLeavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewApplyLeavePageRoutingModule {}
