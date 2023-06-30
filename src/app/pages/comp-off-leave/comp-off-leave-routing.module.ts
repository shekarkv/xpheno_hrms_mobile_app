import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompOffLeavePage } from './comp-off-leave.page';

const routes: Routes = [
  {
    path: '',
    component: CompOffLeavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompOffLeavePageRoutingModule {}
