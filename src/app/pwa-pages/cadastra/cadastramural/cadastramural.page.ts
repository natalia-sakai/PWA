import { ModalController } from '@ionic/angular';
import { AlertService } from './../../../services/alert.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastramural',
  templateUrl: './cadastramural.page.html',
  styleUrls: ['./cadastramural.page.scss'],
})
export class CadastramuralPage{

  constructor(private authService: AuthService, private alertService:AlertService, private modalCtrl:ModalController) { }
  dismiss(){
    this.modalCtrl.dismiss();
  }
  cadastrar(form:any){
    this.authService.user().subscribe(data=>{
      this.authService.mural(data.id, form.value.texto).subscribe(resul=>{
          this.alertService.presentToast("Mensagem criada com sucesso!");
          this.dismiss();
          window.location.reload();
        }
      );
    });
    
  }

}
