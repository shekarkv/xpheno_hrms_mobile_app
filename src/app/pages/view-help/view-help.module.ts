import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewHelpPageRoutingModule } from './view-help-routing.module';

import { ViewHelpPage } from './view-help.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewHelpPageRoutingModule
  ],
  declarations: [ViewHelpPage]
})
export class ViewHelpPageModule {}
