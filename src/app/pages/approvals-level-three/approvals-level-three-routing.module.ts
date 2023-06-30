import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApprovalsLevelThreePage } from './approvals-level-three.page';

const routes: Routes = [
  {
    path: '',
    component: ApprovalsLevelThreePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApprovalsLevelThreePageRoutingModule {}
