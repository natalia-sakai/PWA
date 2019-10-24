import { AlertController, NavController } from '@ionic/angular';
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
    private navCtrl: NavController) { }

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

  async openActions(agape:any){
    let alertTeste = await this.alertCtrl.create({
      header: 'Edite o ágape',
      inputs: [
        {
          name: 'agape',
          type: 'text',
          placeholder: 'agape'
        },
        {
          name: 'data',
          type: 'date'
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
            this.edit(form.agape, agape, form.data);
          }
        }
      ]
    });
    await alertTeste.present();
  }

  async edit(novo:any, antigo:any, date:any){
    await this.authService.getAgape().subscribe(
    data=>{
      for(let i=0; i<data.length;i++)
      {
        if(antigo == data[i].agape && data[i].ativo == 1)
        {
          this.authService.updateagape(data[i].id, novo, 1, date).subscribe(
            data=>{
              this.alertService.presentToast("Ágape editado com sucesso!");
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
      header: 'Cadastre um ágape',
      inputs: [
        {
          name: 'agape',
          type: 'text',
          placeholder: 'agape'
        },
        {
          name: 'data',
          type: 'date'
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
            this.add(form.agape, form.data);
          }
        }
      ]
    });
    await alertTeste.present();
  }

  async add(agape:any, date:any){
    this.authService.user().subscribe(data=>{
      this.authService.agape(agape,data.id,date).subscribe(
        data=> {
          this.alertService.presentToast("Ágape criada com sucesso!");
          window.location.reload();
        }
      )
    })
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
