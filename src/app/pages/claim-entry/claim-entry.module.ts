import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClaimEntryPageRoutingModule } from './claim-entry-routing.module';

import { ClaimEntryPage } from './claim-entry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClaimEntryPageRoutingModule
  ],
  declarations: [ClaimEntryPage]
})
export class ClaimEntryPageModule {}
