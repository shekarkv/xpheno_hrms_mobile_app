import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ThemeSettingsPage } from './theme-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ThemeSettingsPage
      }
    ])
  ],
  declarations: [ThemeSettingsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ThemeSettingsPageModule {}
