import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YTDStatementPageRoutingModule } from './ytd-statement-routing.module';

import { YTDStatementPage } from './ytd-statement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YTDStatementPageRoutingModule
  ],
  declarations: [YTDStatementPage]
})
export class YTDStatementPageModule {}
