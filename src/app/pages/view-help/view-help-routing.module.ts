import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewHelpPage } from './view-help.page';

const routes: Routes = [
  {
    path: '',
    component: ViewHelpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewHelpPageRoutingModule {}
