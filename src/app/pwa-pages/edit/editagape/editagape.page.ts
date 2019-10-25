import { ModalController, NavParams } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editagape',
  templateUrl: './editagape.page.html',
  styleUrls: ['./editagape.page.scss'],
})
export class EditagapePage{
  public agape: any;
  public data: any;
  constructor(private authService: AuthService, private navParams: NavParams,
     private alertService:AlertService, private modalCtrl:ModalController) { }
  ionViewWillEnter(){
    this.showagape();
  }
  dismiss(){
    this.modalCtrl.dismiss();
  }

  showagape() {
    this.authService.getAgape().subscribe(
      data=>{
        for(let i=0; i<data.length;i++)
        {
          if(this.navParams.get('id') == data[i].id){
            this.agape = data[i].agape;
            this.data = data[i].data;
          }
        }
    },
    error=>{
      console.log(error);
    });
  }
  async editar(form:any){
    await this.authService.getAgape().subscribe(
    data=>{
      for(let i=0; i<data.length;i++)
      {
        if(this.navParams.get('id') == data[i].id)
        {
          this.authService.updateagape(data[i].id, form.value.agape, 1, form.value.data).subscribe(
            data=>{
              this.alertService.presentToast("Ágape editado com sucesso!");
              this.dismiss();
              window.location.reload();
            }
          );
        }
      }
  },
  error=>{
    console.log(error);
  });
  }
}
