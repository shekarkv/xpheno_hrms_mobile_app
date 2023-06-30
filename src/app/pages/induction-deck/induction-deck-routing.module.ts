import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InductionDeckPage } from './induction-deck.page';

const routes: Routes = [
  {
    path: '',
    component: InductionDeckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InductionDeckPageRoutingModule {}
