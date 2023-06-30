import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApprovalsLevelTwoPageRoutingModule } from './approvals-level-two-routing.module';

import { ApprovalsLevelTwoPage } from './approvals-level-two.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApprovalsLevelTwoPageRoutingModule
  ],
  declarations: [ApprovalsLevelTwoPage]
})
export class ApprovalsLevelTwoPageModule {}
