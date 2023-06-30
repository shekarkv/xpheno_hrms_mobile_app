import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClaimEntryPage } from './claim-entry.page';

const routes: Routes = [
  {
    path: '',
    component: ClaimEntryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClaimEntryPageRoutingModule {}
