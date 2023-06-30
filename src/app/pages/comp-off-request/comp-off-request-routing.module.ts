import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompOffRequestPage } from './comp-off-request.page';

const routes: Routes = [
  {
    path: '',
    component: CompOffRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompOffRequestPageRoutingModule {}
