import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastrafinanceiro',
  templateUrl: './cadastrafinanceiro.page.html',
  styleUrls: ['./cadastrafinanceiro.page.scss'],
})
export class CadastrafinanceiroPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  dismiss(){
    this.modalCtrl.dismiss();
  }

  cadastrar(form:any){

  }
}
