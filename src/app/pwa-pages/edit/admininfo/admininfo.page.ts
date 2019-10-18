import { Router } from '@angular/router';
import { AlertService } from './../../../services/alert.service';
import { ActionSheetController, NavController, AlertController } from '@ionic/angular';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admininfo',
  templateUrl: './admininfo.page.html',
  styleUrls: ['./admininfo.page.scss'],
})
export class AdmininfoPage implements OnInit {

  constructor(public authService: AuthService, private alertService: AlertService, private alertCtrl:AlertController, private navCtrl: NavController) { }

  ngOnInit() {
    
  }

  ionViewWillEnter()
  {
    this.showinfo();
  }
  public info: any[]=[];
  public inform:any;
  async showinfo() {
    await this.authService.getInfo().subscribe(
      data=>{
        for(let i=0; i<data.length;i++)
        {
          this.info[i]=data[i].info;
        }
        this.handleinfo();
    },
    error=>{
      console.log(error);
    });
  }

  handleinfo()
  {
    this.info;
  }

  async openActions(info:any){
    let alertTeste = await this.alertCtrl.create({
      header: 'Edite o informativo',
      inputs: [
        {
          name: 'info',
          type: 'text',
          placeholder: 'informativo'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          //role cancel deixa ele como segunda opcao
          role: 'cancel',
          cssClass: 'secondary',
          handler: ()=>{
          
          }
        },
        {
          text: 'Salvar',
          handler: (form)=> {
            this.edit(form.info, info);
          }
        }
      ]
    });
    await alertTeste.present();
  }
  async edit(novo:any, antigo:any){
    await this.authService.getInfo().subscribe(
    data=>{
      for(let i=0; i<data.length;i++)
      {
        //informação tem que estar ativa
        if(antigo == data[i].info && data[i].ativo == 1)
        {
          this.authService.updateinfo(data[i].id, novo, 1).subscribe(
            data=>{
              this.alertService.presentToast("Informativo editado com sucesso!");
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

  async cadastrar()
  {
    let alertTeste = await this.alertCtrl.create({
      header: 'Cadastre um informativo',
      inputs: [
        {
          name: 'info',
          type: 'text',
          placeholder: 'informativo'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          //role cancel deixa ele como segunda opcao
          role: 'cancel',
          cssClass: 'secondary',
          handler: ()=>{
          
          }
        },
        {
          text: 'Salvar',
          handler: (form)=> {
            this.add(form.info);
          }
        }
      ]
    });
    await alertTeste.present();
  }

  async add(info:any){
    this.authService.getId().subscribe(data=>{
      this.authService.informativo(info,data.id,1).subscribe(
        data=> {
          this.alertService.presentToast("Informativo criado com sucesso!");
          window.location.reload();
        }
      )
    })
  }

  async delete(inform: any){
    await this.authService.getInfo().subscribe(
      data=>{
        for(let i=0; i<data.length;i++)
        {
          //informação tem que estar ativa
          if(inform == data[i].info && data[i].ativo == 1)
          {
            console.log('achou');
            console.log(data[i].id);
            //muda o ativo para zero
            this.authService.updateinfo(data[i].id, inform, 0).subscribe(
              data=>{
                this.alertService.presentToast("Informativo excluido com sucesso!");
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

  historico(){
    this.navCtrl.navigateForward('/hisinfo');
  }
}
