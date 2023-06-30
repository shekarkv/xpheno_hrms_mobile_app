import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeaveBalancePageRoutingModule } from './leave-balance-routing.module';

import { LeaveBalancePage } from './leave-balance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeaveBalancePageRoutingModule
  ],
  declarations: [LeaveBalancePage]
})
export class LeaveBalancePageModule {}
