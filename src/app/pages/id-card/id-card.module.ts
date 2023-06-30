import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IDCardPageRoutingModule } from './id-card-routing.module';

import { IDCardPage } from './id-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IDCardPageRoutingModule
  ],
  declarations: [IDCardPage]
})
export class IDCardPageModule {}
