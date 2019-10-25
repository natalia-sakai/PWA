import { ModalController, NavParams } from '@ionic/angular';
import { AlertService } from './../../../services/alert.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editmural',
  templateUrl: './editmural.page.html',
  styleUrls: ['./editmural.page.scss'],
})
export class EditmuralPage{
  public texto: string;
  constructor(private authService: AuthService, private alertService:AlertService, 
    private modalCtrl:ModalController, private navParams: NavParams) { }
  ionViewWillEnter(){
    this.showmural();
  }
  dismiss(){
    this.modalCtrl.dismiss();
  }

  showmural(){
    this.authService.getMural().subscribe(data=>{
      for(let i=0; i<data.length;i++)
      {
        if(this.navParams.get('id') == data[i].id){
          this.texto = data[i].texto;
        }
      }
    });
  }

  editar(form:any){
    this.authService.getMural().subscribe(data=>{
      for(let i=0; i<data.length;i++)
      {
        if(this.navParams.get('id') == data[i].id){
          this.authService.updatemural(data[i].id, form.value.texto).subscribe(resul=>{
            this.alertService.presentToast("Mural editado com sucesso!");
              this.dismiss();
              window.location.reload();
          });
        }
      }
    },
    error=>{
      console.log(error);
    });
  }

}
