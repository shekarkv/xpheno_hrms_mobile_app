import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManagerDashboardPageRoutingModule } from './manager-dashboard-routing.module';

import { ManagerDashboardPage } from './manager-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManagerDashboardPageRoutingModule
  ],
  declarations: [ManagerDashboardPage]
})
export class ManagerDashboardPageModule {}
