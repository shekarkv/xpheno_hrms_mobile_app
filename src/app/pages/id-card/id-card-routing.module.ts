import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IDCardPage } from './id-card.page';

const routes: Routes = [
  {
    path: '',
    component: IDCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IDCardPageRoutingModule {}
