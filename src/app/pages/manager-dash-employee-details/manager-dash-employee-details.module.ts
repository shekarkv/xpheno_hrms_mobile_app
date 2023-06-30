import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManagerDashEmployeeDetailsPageRoutingModule } from './manager-dash-employee-details-routing.module';

import { ManagerDashEmployeeDetailsPage } from './manager-dash-employee-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManagerDashEmployeeDetailsPageRoutingModule
  ],
  declarations: [ManagerDashEmployeeDetailsPage]
})
export class ManagerDashEmployeeDetailsPageModule {}
