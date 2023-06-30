import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeaveDetailsPageRoutingModule } from './leave-details-routing.module';

import { LeaveDetailsPage } from './leave-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeaveDetailsPageRoutingModule
  ],
  declarations: [LeaveDetailsPage]
})
export class LeaveDetailsPageModule {}
