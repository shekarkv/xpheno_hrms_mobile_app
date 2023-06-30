import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompOffLeavePageRoutingModule } from './comp-off-leave-routing.module';

import { CompOffLeavePage } from './comp-off-leave.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompOffLeavePageRoutingModule
  ],
  declarations: [CompOffLeavePage]
})
export class CompOffLeavePageModule {}
