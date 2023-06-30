import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResignationRequestPage } from './resignation-request.page';

const routes: Routes = [
  {
    path: '',
    component: ResignationRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResignationRequestPageRoutingModule {}
