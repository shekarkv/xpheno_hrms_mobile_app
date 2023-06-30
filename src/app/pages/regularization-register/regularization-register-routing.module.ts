import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegularizationRegisterPage } from './regularization-register.page';

const routes: Routes = [
  {
    path: '',
    component: RegularizationRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegularizationRegisterPageRoutingModule {}
