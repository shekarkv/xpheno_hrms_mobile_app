import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeeProfileEditPageRoutingModule } from './employee-profile-edit-routing.module';

import { EmployeeProfileEditPage } from './employee-profile-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeeProfileEditPageRoutingModule
  ],
  declarations: [EmployeeProfileEditPage]
})
export class EmployeeProfileEditPageModule {}
