import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FrameworkReferenceFieldPage } from './framework-reference-field.page';

const routes: Routes = [
  {
    path: '',
    component: FrameworkReferenceFieldPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FrameworkReferenceFieldPageRoutingModule {}
