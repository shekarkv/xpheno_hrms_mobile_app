import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WFHRequestPage } from './wfh-request.page';

const routes: Routes = [
  {
    path: '',
    component: WFHRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WFHRequestPageRoutingModule {}
