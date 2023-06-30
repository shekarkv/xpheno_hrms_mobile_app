import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendanceRegularizationPageRoutingModule } from './attendance-regularization-routing.module';

import { AttendanceRegularizationPage } from './attendance-regularization.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendanceRegularizationPageRoutingModule
  ],
  declarations: [AttendanceRegularizationPage]
})
export class AttendanceRegularizationPageModule {}
