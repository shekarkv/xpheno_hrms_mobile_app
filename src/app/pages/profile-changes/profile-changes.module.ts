import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileChangesPageRoutingModule } from './profile-changes-routing.module';

import { ProfileChangesPage } from './profile-changes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileChangesPageRoutingModule
  ],
  declarations: [ProfileChangesPage]
})
export class ProfileChangesPageModule {}
