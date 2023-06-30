import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewOnDutyRequestPage } from './view-on-duty-request.page';

const routes: Routes = [
  {
    path: '',
    component: ViewOnDutyRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewOnDutyRequestPageRoutingModule {}
