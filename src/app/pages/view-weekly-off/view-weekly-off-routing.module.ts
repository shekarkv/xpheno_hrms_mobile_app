import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewWeeklyOffPage } from './view-weekly-off.page';

const routes: Routes = [
  {
    path: '',
    component: ViewWeeklyOffPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewWeeklyOffPageRoutingModule {}
