import { AlertService } from './../../../services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastrainfo',
  templateUrl: './cadastrainfo.page.html',
  styleUrls: ['./cadastrainfo.page.scss'],
})
export class CadastrainfoPage implements OnInit {

  constructor(private authService: AuthService, private modalCtrl: ModalController,
    private alertService: AlertService) { }

  ngOnInit() {
  }
  dismiss(){
    this.modalCtrl.dismiss();
  }
  async cadastrar(form:any){
    this.authService.user().subscribe(data=>{
      this.authService.informativo(form.value.info,data.id,form.value.nivel).subscribe(
        data=> {
          this.alertService.presentToast("Informativo criado com sucesso!");
          this.dismiss();
          window.location.reload();
        }
      );
    });
  }
}
