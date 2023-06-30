import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendanceRegisterPageRoutingModule } from './attendance-register-routing.module';

import { AttendanceRegisterPage } from './attendance-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendanceRegisterPageRoutingModule
  ],
  declarations: [AttendanceRegisterPage]
})
export class AttendanceRegisterPageModule {}
