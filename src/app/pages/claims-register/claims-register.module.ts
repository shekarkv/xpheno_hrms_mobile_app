import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClaimsRegisterPageRoutingModule } from './claims-register-routing.module';

import { ClaimsRegisterPage } from './claims-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClaimsRegisterPageRoutingModule
  ],
  declarations: [ClaimsRegisterPage]
})
export class ClaimsRegisterPageModule {}
