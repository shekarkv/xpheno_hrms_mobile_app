import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsuranceCardPageRoutingModule } from './insurance-card-routing.module';

import { InsuranceCardPage } from './insurance-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsuranceCardPageRoutingModule
  ],
  declarations: [InsuranceCardPage]
})
export class InsuranceCardPageModule {}
