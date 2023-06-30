import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExitEmployeesRegisterPageRoutingModule } from './exit-employees-register-routing.module';

import { ExitEmployeesRegisterPage } from './exit-employees-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExitEmployeesRegisterPageRoutingModule
  ],
  declarations: [ExitEmployeesRegisterPage]
})
export class ExitEmployeesRegisterPageModule {}
