import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HelpItemsPageRoutingModule } from './help-items-routing.module';

import { HelpItemsPage } from './help-items.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HelpItemsPageRoutingModule
  ],
  declarations: [HelpItemsPage]
})
export class HelpItemsPageModule {}
