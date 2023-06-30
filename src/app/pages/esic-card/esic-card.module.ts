import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ESICCardPageRoutingModule } from './esic-card-routing.module';

import { ESICCardPage } from './esic-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ESICCardPageRoutingModule
  ],
  declarations: [ESICCardPage]
})
export class ESICCardPageModule {}
