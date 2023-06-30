import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendanceRegisterPage } from './attendance-register.page';

const routes: Routes = [
  {
    path: '',
    component: AttendanceRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendanceRegisterPageRoutingModule {}
