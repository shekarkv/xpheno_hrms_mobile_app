import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FrameworkGridViewPage } from './framework-grid-view.page';

const routes: Routes = [
  {
    path: '',
    component: FrameworkGridViewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FrameworkGridViewPage]
})
export class FrameworkGridViewPageModule {}
