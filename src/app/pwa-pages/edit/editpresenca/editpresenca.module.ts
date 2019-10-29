import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditpresencaPage } from './editpresenca.page';

const routes: Routes = [
  {
    path: '',
    component: EditpresencaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditpresencaPage]
  //declarations: []
})
export class EditpresencaPageModule {}
