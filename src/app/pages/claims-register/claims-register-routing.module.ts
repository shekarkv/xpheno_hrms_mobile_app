import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClaimsRegisterPage } from './claims-register.page';

const routes: Routes = [
  {
    path: '',
    component: ClaimsRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClaimsRegisterPageRoutingModule {}
