import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewClaimEntryPageRoutingModule } from './view-claim-entry-routing.module';

import { ViewClaimEntryPage } from './view-claim-entry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewClaimEntryPageRoutingModule
  ],
  declarations: [ViewClaimEntryPage]
})
export class ViewClaimEntryPageModule {}
