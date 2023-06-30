import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegularizationRegisterPageRoutingModule } from './regularization-register-routing.module';

import { RegularizationRegisterPage } from './regularization-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegularizationRegisterPageRoutingModule
  ],
  declarations: [RegularizationRegisterPage]
})
export class RegularizationRegisterPageModule {}
