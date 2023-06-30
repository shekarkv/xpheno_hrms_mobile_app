import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonthlyAttandenceListPageRoutingModule } from './monthly-attandence-list-routing.module';

import { MonthlyAttandenceListPage } from './monthly-attandence-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MonthlyAttandenceListPageRoutingModule
  ],
  declarations: [MonthlyAttandenceListPage]
})
export class MonthlyAttandenceListPageModule {}
