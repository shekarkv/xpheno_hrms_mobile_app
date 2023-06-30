import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewRegularizationRegisterPage } from './view-regularization-register.page';

const routes: Routes = [
  {
    path: '',
    component: ViewRegularizationRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewRegularizationRegisterPageRoutingModule {}
