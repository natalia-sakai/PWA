import { CadastraagapePage } from './../../cadastra/cadastraagape/cadastraagape.page';
import { EditagapePage } from './../../edit/editagape/editagape.page';
import { AlertController, NavController, ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminagape',
  templateUrl: './adminagape.page.html',
  styleUrls: ['./adminagape.page.scss'],
})
export class AdminagapePage implements OnInit {
  public agape: any[]=[];
  public disabled1=true;
  constructor(private authService: AuthService,
    private alertService: AlertService, 
    private alertCtrl:AlertController, 
    private navCtrl: NavController, private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.showagape();
    this.permissao();
  }
  permissao(){
    this.authService.user().subscribe(data=>{
      if(data.cargo_id == 11 || data.cargo_id == 8 || data.cargo_id ==4){
        this.disabled1 = false;
      }
    });
  }
  async showagape()
  {
    await this.authService.getAgape().subscribe(
      data=>{
        for(let i=0; i<data.length;i++)
        {
          this.agape[i]=data[i].agape;
        }
    },
    error=>{
      console.log(error);
    });
  }

  async cadastrar(){
    const cadastrar = await this.modalCtrl.create({
      component: CadastraagapePage
    });
    return await cadastrar.present();
  }

  async editar(inform:any){
    const editar = await this.modalCtrl.create({
      component: EditagapePage, 
      componentProps:{
        inform: inform,
        other: {couldAlsoBeAnObject: true}
      }
    });
    return await editar.present();
  }

  async delete(agape: any){
    await this.authService.getAgape().subscribe(
      data=>{
        for(let i=0; i<data.length;i++)
        {
          if(agape == data[i].agape)
          {
            console.log(data[i].data);
            //muda o ativo para zero
            this.authService.updateagape(data[i].id, agape, 0, data[i].data).subscribe(
              data=>{
                this.alertService.presentToast("Ordem excluido com sucesso!");
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
    this.navCtrl.navigateForward('/hisagape');
  }
}
