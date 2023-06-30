import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClaimEntryDetailsPage } from './claim-entry-details.page';

const routes: Routes = [
  {
    path: '',
    component: ClaimEntryDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClaimEntryDetailsPageRoutingModule {}
