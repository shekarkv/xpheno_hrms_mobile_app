import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ESICCardPage } from './esic-card.page';

const routes: Routes = [
  {
    path: '',
    component: ESICCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ESICCardPageRoutingModule {}
