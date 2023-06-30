import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsuranceCardPage } from './insurance-card.page';

const routes: Routes = [
  {
    path: '',
    component: InsuranceCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsuranceCardPageRoutingModule {}
