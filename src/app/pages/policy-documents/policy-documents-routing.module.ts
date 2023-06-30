import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PolicyDocumentsPage } from './policy-documents.page';

const routes: Routes = [
  {
    path: '',
    component: PolicyDocumentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolicyDocumentsPageRoutingModule {}
