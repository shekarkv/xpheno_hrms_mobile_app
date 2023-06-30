import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeeklyOffPageRoutingModule } from './weekly-off-routing.module';

import { WeeklyOffPage } from './weekly-off.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeeklyOffPageRoutingModule
  ],
  declarations: [WeeklyOffPage]
})
export class WeeklyOffPageModule {}
