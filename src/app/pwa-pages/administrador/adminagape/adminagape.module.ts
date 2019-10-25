import { CadastraagapePage } from './../../cadastra/cadastraagape/cadastraagape.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminagapePage } from './adminagape.page';
import { EditagapePage } from '../../edit/editagape/editagape.page';

const routes: Routes = [
  {
    path: '',
    component: AdminagapePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    
  ],
  declarations: [AdminagapePage,CadastraagapePage,EditagapePage],
  entryComponents: [CadastraagapePage,EditagapePage]
})
export class AdminagapePageModule {}
