import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DemoAttachmentsPageRoutingModule } from './demo-attachments-routing.module';

import { DemoAttachmentsPage } from './demo-attachments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DemoAttachmentsPageRoutingModule
  ],
  declarations: [DemoAttachmentsPage]
})
export class DemoAttachmentsPageModule {}
