import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewOnDutyRequestPageRoutingModule } from './view-on-duty-request-routing.module';

import { ViewOnDutyRequestPage } from './view-on-duty-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewOnDutyRequestPageRoutingModule
  ],
  declarations: [ViewOnDutyRequestPage]
})
export class ViewOnDutyRequestPageModule {}
