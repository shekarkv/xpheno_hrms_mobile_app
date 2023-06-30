import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonthlyAttandenceListPage } from './monthly-attandence-list.page';

const routes: Routes = [
  {
    path: '',
    component: MonthlyAttandenceListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonthlyAttandenceListPageRoutingModule {}
