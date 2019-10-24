import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HisfinanceiroPage } from './hisfinanceiro.page';

const routes: Routes = [
  {
    path: '',
    component: HisfinanceiroPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HisfinanceiroPage]
})
export class HisfinanceiroPageModule {}
