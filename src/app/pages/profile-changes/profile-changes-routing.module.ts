import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileChangesPage } from './profile-changes.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileChangesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileChangesPageRoutingModule {}
