import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApprovalsLevelTwoPage } from './approvals-level-two.page';

const routes: Routes = [
  {
    path: '',
    component: ApprovalsLevelTwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApprovalsLevelTwoPageRoutingModule {}
