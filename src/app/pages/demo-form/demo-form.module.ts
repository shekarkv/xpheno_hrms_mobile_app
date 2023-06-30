import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DemoFormPageRoutingModule } from './demo-form-routing.module';

import { DemoFormPage } from './demo-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DemoFormPageRoutingModule
  ],
  declarations: [DemoFormPage]
})
export class DemoFormPageModule {}
