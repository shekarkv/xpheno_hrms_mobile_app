import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeaveRegisterPageRoutingModule } from './leave-register-routing.module';

import { LeaveRegisterPage } from './leave-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeaveRegisterPageRoutingModule
  ],
  declarations: [LeaveRegisterPage]
})
export class LeaveRegisterPageModule {}
