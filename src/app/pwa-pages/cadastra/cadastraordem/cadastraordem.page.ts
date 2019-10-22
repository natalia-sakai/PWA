import { AlertService } from './../../../services/alert.service';
import { AuthService } from './../../../services/auth.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastraordem',
  templateUrl: './cadastraordem.page.html',
  styleUrls: ['./cadastraordem.page.scss'],
})
export class CadastraordemPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private authService: AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }
  dismiss(){
    this.modalCtrl.dismiss();
  }

  cadastrar(form:any){

    this.authService.getId().subscribe(data=>{
      this.authService.ordem(form.value.ordem,data.id,form.value.nivel).subscribe(
        data=> {
          this.alertService.presentToast("Ordem criada com sucesso!");
          this.dismiss();
          window.location.reload();
        }
      )
    });
  }
}