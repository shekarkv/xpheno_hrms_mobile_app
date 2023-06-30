import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FrameworkReferenceFieldPageRoutingModule } from './framework-reference-field-routing.module';

import { FrameworkReferenceFieldPage } from './framework-reference-field.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FrameworkReferenceFieldPageRoutingModule
  ],
  declarations: [FrameworkReferenceFieldPage]
})
export class FrameworkReferenceFieldPageModule {}
