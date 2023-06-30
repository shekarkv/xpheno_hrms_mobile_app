import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PolicyDocumentsPageRoutingModule } from './policy-documents-routing.module';

import { PolicyDocumentsPage } from './policy-documents.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PolicyDocumentsPageRoutingModule
  ],
  declarations: [PolicyDocumentsPage]
})
export class PolicyDocumentsPageModule {}
