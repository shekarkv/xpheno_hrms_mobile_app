import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InductionDeckPageRoutingModule } from './induction-deck-routing.module';

import { InductionDeckPage } from './induction-deck.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InductionDeckPageRoutingModule
  ],
  declarations: [InductionDeckPage]
})
export class InductionDeckPageModule {}
