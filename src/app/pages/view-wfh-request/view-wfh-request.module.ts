import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewWFHRequestPageRoutingModule } from './view-wfh-request-routing.module';

import { ViewWFHRequestPage } from './view-wfh-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewWFHRequestPageRoutingModule
  ],
  declarations: [ViewWFHRequestPage]
})
export class ViewWFHRequestPageModule {}
