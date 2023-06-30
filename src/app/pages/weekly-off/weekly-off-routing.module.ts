import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeeklyOffPage } from './weekly-off.page';

const routes: Routes = [
  {
    path: '',
    component: WeeklyOffPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeeklyOffPageRoutingModule {}
