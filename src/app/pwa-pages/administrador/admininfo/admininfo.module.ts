import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdmininfoPage } from './admininfo.page';
import { EditinfoPage } from '../../edit/editinfo/editinfo.page';
import { CadastrainfoPage } from '../../cadastra/cadastrainfo/cadastrainfo.page';

const routes: Routes = [
  {
    path: '',
    component: AdmininfoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  // declarations: [AdmininfoPage,EditinfoPage,CadastrainfoPage],
  declarations: [AdmininfoPage],
  entryComponents: [EditinfoPage,CadastrainfoPage]
})
export class AdmininfoPageModule {}
