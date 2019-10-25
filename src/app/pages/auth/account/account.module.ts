import { EditsenhaPage } from './../editsenha/editsenha.page';
import { EditdadosPage } from './../editdados/editdados.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { AccountPage } from './account.page';

const routes: Routes = [
  {
    path: '',
    component: AccountPage
  },
  {
    path: 'editdados',
    component: EditdadosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AccountPage, EditdadosPage, EditsenhaPage],
  // declarations: [AccountPage],
  entryComponents: [EditdadosPage, EditsenhaPage]
})
export class AccountPageModule {}
