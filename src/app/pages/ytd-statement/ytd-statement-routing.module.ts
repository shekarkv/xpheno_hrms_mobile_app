import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YTDStatementPage } from './ytd-statement.page';

const routes: Routes = [
  {
    path: '',
    component: YTDStatementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YTDStatementPageRoutingModule {}
