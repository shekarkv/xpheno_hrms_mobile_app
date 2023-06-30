import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApprovalsLevelThreePageRoutingModule } from './approvals-level-three-routing.module';

import { ApprovalsLevelThreePage } from './approvals-level-three.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApprovalsLevelThreePageRoutingModule
  ],
  declarations: [ApprovalsLevelThreePage]
})
export class ApprovalsLevelThreePageModule {}
