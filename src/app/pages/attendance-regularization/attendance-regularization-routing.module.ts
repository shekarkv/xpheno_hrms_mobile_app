import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendanceRegularizationPage } from './attendance-regularization.page';

const routes: Routes = [
  {
    path: '',
    component: AttendanceRegularizationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendanceRegularizationPageRoutingModule {}
