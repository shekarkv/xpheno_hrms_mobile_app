import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClaimEntryDetailsPageRoutingModule } from './claim-entry-details-routing.module';

import { ClaimEntryDetailsPage } from './claim-entry-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClaimEntryDetailsPageRoutingModule
  ],
  declarations: [ClaimEntryDetailsPage]
})
export class ClaimEntryDetailsPageModule {}
