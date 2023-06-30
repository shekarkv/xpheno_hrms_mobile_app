import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnDutyRequestPageRoutingModule } from './on-duty-request-routing.module';

import { OnDutyRequestPage } from './on-duty-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnDutyRequestPageRoutingModule
  ],
  declarations: [OnDutyRequestPage]
})
export class OnDutyRequestPageModule {}
