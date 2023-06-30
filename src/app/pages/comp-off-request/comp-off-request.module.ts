import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompOffRequestPageRoutingModule } from './comp-off-request-routing.module';

import { CompOffRequestPage } from './comp-off-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompOffRequestPageRoutingModule
  ],
  declarations: [CompOffRequestPage]
})
export class CompOffRequestPageModule {}
