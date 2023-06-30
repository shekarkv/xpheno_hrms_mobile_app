import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemoAttachmentsPage } from './demo-attachments.page';

const routes: Routes = [
  {
    path: '',
    component: DemoAttachmentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemoAttachmentsPageRoutingModule {}
