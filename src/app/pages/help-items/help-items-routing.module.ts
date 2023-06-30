import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpItemsPage } from './help-items.page';

const routes: Routes = [
  {
    path: '',
    component: HelpItemsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpItemsPageRoutingModule {}
