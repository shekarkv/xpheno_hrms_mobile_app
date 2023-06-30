import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnDutyRequestPage } from './on-duty-request.page';

const routes: Routes = [
  {
    path: '',
    component: OnDutyRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnDutyRequestPageRoutingModule {}
