import { NavParams, ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editinfo',
  templateUrl: './editinfo.page.html',
  styleUrls: ['./editinfo.page.scss'],
})
export class EditinfoPage implements OnInit {

  public checked1 = "false";
  public checked2 = "false";
  public checked3 = "false";
  public inform:string;
  public nivel:any;
  constructor(private authService: AuthService, private modalCtrl: ModalController,
    private alertService: AlertService, private navParams: NavParams) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.showinfo();
  }

  showinfo() {
    this.authService.getInfo().subscribe(
      data=>{
        for(let i=0; i<data.length;i++)
        {
          if(this.navParams.get('id') == data[i].id){
            this.inform = data[i].info;
            this.nivel = data[i].nivel;
            switch (this.nivel)
            {
              case 1: 
                this.checked1 = "true";
                break;
              case 2:
                this.checked2 = "true";
                break;
              case 3:
                this.checked3 = "true";
                break;
            }
          }
        }
    },
    error=>{
      console.log(error);
    });
  }

  dismiss(){
    this.modalCtrl.dismiss();
  }

  async editar(form:any){
    await this.authService.getInfo().subscribe(
    data=>{
      for(let i=0; i<data.length;i++)
      {
        if(this.navParams.get('id') == data[i].id)
        {
          this.authService.updateinfo(data[i].id, form.value.novo, 1, form.value.nivel).subscribe(
            data=>{
              this.alertService.presentToast("Informativo editado com sucesso!");
              this.dismiss();
              window.location.reload();
            }
          )
        }
      }
  },
  error=>{
    console.log(error);
  });
  }

}
