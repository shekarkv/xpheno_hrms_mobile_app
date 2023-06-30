import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResignationRequestPageRoutingModule } from './resignation-request-routing.module';

import { ResignationRequestPage } from './resignation-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResignationRequestPageRoutingModule
  ],
  declarations: [ResignationRequestPage]
})
export class ResignationRequestPageModule {}
