import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewRegularizationRegisterPageRoutingModule } from './view-regularization-register-routing.module';

import { ViewRegularizationRegisterPage } from './view-regularization-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewRegularizationRegisterPageRoutingModule
  ],
  declarations: [ViewRegularizationRegisterPage]
})
export class ViewRegularizationRegisterPageModule {}
