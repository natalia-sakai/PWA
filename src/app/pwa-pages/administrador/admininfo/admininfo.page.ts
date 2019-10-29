import { AppRoutingPreloaderService } from './../../../route-to-preload';
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
  public disabled1=true;
  constructor(public authService: AuthService, private alertService: AlertService,
     private alertCtrl:AlertController, private navCtrl: NavController,
     private modalCtrl: ModalController, private routingService:AppRoutingPreloaderService) { }

  ngOnInit() {
    
  }
  async ionViewDidEnter() {
    await this.routingService.preloadRoute('editinfo');
    await this.routingService.preloadRoute('cadastrainfo');
    await this.routingService.preloadRoute('hisinfo');
  }
  ionViewWillEnter()
  {
    this.showinfo();
    this.permissao();
  }
  permissao(){
    this.authService.user().subscribe(data=>{
      if(data.cargo_id == 9 || data.cargo_id == 4){
        this.disabled1 = false;
      }
    });
  }
  async showinfo() {
    await this.authService.getInfo().subscribe(
      data=>{
        for(let i=0; i<data.length;i++)
        {
          this.info[i]=data[i];
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

  async editar(id:any){
    console.log(id)
    const editar = await this.modalCtrl.create({
      component: EditinfoPage, 
      componentProps:{
        id: id,
        other: {couldAlsoBeAnObject: true}
      }
    });
    return await editar.present();
  }
  
  async delete(id: any){
    await this.authService.getInfo().subscribe(
      data=>{
        for(let i=0; i<data.length;i++)
        {
          if(id == data[i].id)
          {
            //muda o ativo para zero
            this.authService.updateinfo(data[i].id, data[i].info, 0, data[i].nivel).subscribe(
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
