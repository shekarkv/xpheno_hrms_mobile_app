import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WFHRequestPageRoutingModule } from './wfh-request-routing.module';

import { WFHRequestPage } from './wfh-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WFHRequestPageRoutingModule
  ],
  declarations: [WFHRequestPage]
})
export class WFHRequestPageModule {}
