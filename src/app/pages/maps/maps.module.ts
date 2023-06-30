import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapsPageRoutingModule } from './maps-routing.module';
import { SharedModule } from './../../components/shared.module';

import { MapsPage } from './maps.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MapsPageRoutingModule
  ],
  declarations: [MapsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MapsPageModule {}
