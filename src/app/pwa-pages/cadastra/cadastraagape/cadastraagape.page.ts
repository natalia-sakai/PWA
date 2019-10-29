import { ModalController } from '@ionic/angular';
import { AlertService } from './../../../services/alert.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-cadastraagape',
  templateUrl: './cadastraagape.page.html',
  styleUrls: ['./cadastraagape.page.scss'],
})
export class CadastraagapePage{

  constructor(private authService: AuthService, private alertService:AlertService, private modalCtrl:ModalController) { }
  dismiss(){
    this.modalCtrl.dismiss();
  }
  cadastrar(form: any){
    this.authService.user().subscribe(data=>{
      this.authService.agape(form.value.agape, data.id, form.value.data).subscribe(
        data=> {
          this.alertService.presentToast("Ágape criada com sucesso!");
          window.location.reload();
        }
      )
    })
  }
}
