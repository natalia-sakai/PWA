import { CadastrainfoPage } from './../../cadastra/cadastrainfo/cadastrainfo.page';
import { EditinfoPage } from './../../edit/editinfo/editinfo.page';
import { Router } from '@angular/router';
import { AlertService } from '../../../services/alert.service';
import { ActionSheetController, NavController, AlertController, ModalController } from '@ionic/angular';
import { AuthService } from '../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admininfo',
  templateUrl: './admininfo.page.html',
  styleUrls: ['./admininfo.page.scss'],
})
export class AdmininfoPage implements OnInit {
  
  public info: any[]=[];
  public inform:any;
  constructor(public authService: AuthService, private alertService: AlertService,
     private alertCtrl:AlertController, private navCtrl: NavController,
     private modalCtrl: ModalController) { }

  ngOnInit() {
    
  }

  ionViewWillEnter()
  {
    this.showinfo();
  }

  async showinfo() {
    await this.authService.getInfo().subscribe(
      data=>{
        for(let i=0; i<data.length;i++)
        {
          this.info[i]=data[i].info;
        }
    },
    error=>{
      console.log(error);
    });
  }
  async cadastrar(){
    const cadastrar = await this.modalCtrl.create({
      component: CadastrainfoPage
    });
    return await cadastrar.present();
  }

  async editar(inform:any){
    const editar = await this.modalCtrl.create({
      component: EditinfoPage, 
      componentProps:{
        inform: inform,
        other: {couldAlsoBeAnObject: true}
      }
    });
    return await editar.present();
  }
  
  async delete(inform: any){
    await this.authService.getInfo().subscribe(
      data=>{
        for(let i=0; i<data.length;i++)
        {
          //informação tem que estar ativa
          if(inform == data[i].info && data[i].ativo == 1)
          {
            console.log(data[i].id);
            //muda o ativo para zero
            this.authService.updateinfo(data[i].id, inform, 0, data[i].nivel).subscribe(
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
