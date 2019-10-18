import { AlertController, NavController } from '@ionic/angular';
import { AlertService } from './../../../services/alert.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminordem',
  templateUrl: './adminordem.page.html',
  styleUrls: ['./adminordem.page.scss'],
})
export class AdminordemPage implements OnInit {

  constructor(public authService: AuthService,
    private alertService: AlertService, 
    private alertCtrl:AlertController, 
    private navCtrl: NavController) { }

  ngOnInit() {
    
  }
  ionViewWillEnter(){
    this.showordem();
  }
  public ordem: any[]=[];
  
  async showordem() {
    await this.authService.getOrdem().subscribe(
      data=>{
        for(let i=0; i<data.length;i++)
        {
          this.ordem[i]=data[i].ordem;
        }
    },
    error=>{
      console.log(error);
    });
  }

  async openActions(ordem:any){
    let alertTeste = await this.alertCtrl.create({
      header: 'Edite a ordem',
      inputs: [
        {
          name: 'ordem',
          type: 'text',
          placeholder: 'ordem'
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
            this.edit(form.ordem, ordem);
          }
        }
      ]
    });
    await alertTeste.present();
  }
  async edit(novo:any, antigo:any){
    await this.authService.getOrdem().subscribe(
    data=>{
      for(let i=0; i<data.length;i++)
      {
        //informação tem que estar ativa
        if(antigo == data[i].ordem && data[i].ativo == 1)
        {
          this.authService.updateordem(data[i].id, novo, 1).subscribe(
            data=>{
              this.alertService.presentToast("Ordem editado com sucesso!");
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
      header: 'Cadastre uma ordem',
      inputs: [
        {
          name: 'ordem',
          type: 'text',
          placeholder: 'ordem'
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
            this.add(form.ordem);
          }
        }
      ]
    });
    await alertTeste.present();
  }

  async add(ordem:any){
    this.authService.getId().subscribe(data=>{
      this.authService.ordem(ordem,data.id).subscribe(
        data=> {
          this.alertService.presentToast("Ordem criada com sucesso!");
          window.location.reload();
        }
      )
    })
  }

  async delete(ordem: any){
    await this.authService.getOrdem().subscribe(
      data=>{
        for(let i=0; i<data.length;i++)
        {
          //informação tem que estar ativa
          if(ordem == data[i].ordem && data[i].ativo == 1)
          {
            console.log('achou');
            console.log(data[i].id);
            //muda o ativo para zero
            this.authService.updateordem(data[i].id, ordem, 0).subscribe(
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
    this.navCtrl.navigateForward('/hisordem');
  }
}
