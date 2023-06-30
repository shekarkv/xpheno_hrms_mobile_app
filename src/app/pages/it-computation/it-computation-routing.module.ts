import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ITComputationPage } from './it-computation.page';

const routes: Routes = [
  {
    path: '',
    component: ITComputationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ITComputationPageRoutingModule {}
