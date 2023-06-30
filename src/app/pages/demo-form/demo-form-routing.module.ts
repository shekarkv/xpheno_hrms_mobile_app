import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemoFormPage } from './demo-form.page';

const routes: Routes = [
  {
    path: '',
    component: DemoFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemoFormPageRoutingModule {}
