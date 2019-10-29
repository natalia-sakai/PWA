import { CadastramuralPage } from './../../pwa-pages/cadastra/cadastramural/cadastramural.page';
import { EditmuralPage } from './../../pwa-pages/edit/editmural/editmural.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MuralPage } from './mural.page';

const routes: Routes = [
  {
    path: '',
    component: MuralPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MuralPage,EditmuralPage, CadastramuralPage],
  entryComponents: [EditmuralPage, CadastramuralPage]
})
export class MuralPageModule {}
