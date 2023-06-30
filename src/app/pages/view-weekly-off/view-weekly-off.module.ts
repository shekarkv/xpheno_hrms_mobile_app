import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewWeeklyOffPageRoutingModule } from './view-weekly-off-routing.module';

import { ViewWeeklyOffPage } from './view-weekly-off.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewWeeklyOffPageRoutingModule
  ],
  declarations: [ViewWeeklyOffPage]
})
export class ViewWeeklyOffPageModule {}
