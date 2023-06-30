import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewApplyLeavePageRoutingModule } from './view-apply-leave-routing.module';

import { ViewApplyLeavePage } from './view-apply-leave.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewApplyLeavePageRoutingModule
  ],
  declarations: [ViewApplyLeavePage]
})
export class ViewApplyLeavePageModule {}
