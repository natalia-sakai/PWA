import { EditordemPage } from './../../edit/editordem/editordem.page';
import { CadastraordemPage } from '../../cadastra/cadastraordem/cadastraordem.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminordemPage } from './adminordem.page';

const routes: Routes = [
  {
    path: '',
    component: AdminordemPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  //declarations: [AdminordemPage, CadastraordemPage, EditordemPage],
  declarations: [AdminordemPage],
  entryComponents: [CadastraordemPage,EditordemPage]
})
export class AdminordemPageModule {}
