import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ITComputationPageRoutingModule } from './it-computation-routing.module';

import { ITComputationPage } from './it-computation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ITComputationPageRoutingModule
  ],
  declarations: [ITComputationPage]
})
export class ITComputationPageModule {}
