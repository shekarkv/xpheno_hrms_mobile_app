import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewWFHRequestPage } from './view-wfh-request.page';

const routes: Routes = [
  {
    path: '',
    component: ViewWFHRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewWFHRequestPageRoutingModule {}
