import { DatePipe } from '@angular/common';
import { AlertService } from './../../services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MenuController, Platform, IonSplitPane, NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  public info: any[]=[];
  public ordem: any[]=[];
  public data:any;
  public confirm:boolean;
  public id_user:any[] = [];
  public motivo: any[] = [];
  public name: any[]=[];
  public agape: any[]=[];
  public presenca: any[] = [];
  public aux = " ";
  public ausente=0;
  public presente=0;
  constructor(
    private menu: MenuController,
    private platform: Platform,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private alertCtrl:AlertController,
    private dataPipe: DatePipe
    ) { 
      this.menu.enable(true, 'web');
  }

  ngOnInit() {
    
  }
  ionViewWillEnter()
  {
    this.showlista();
    this.showdata();
    this.showinfo();
    this.showordem();
    this.showagape();
  }
  //#region Show

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

  async showdata()
  {
    //mostra a data se tiver
    await this.authService.getReuniao()
    .subscribe(
    data=>{ 
      this.data = (this.dataPipe.transform(data[0].data, "dd/MM"));
    }
    , error=>{ 
      console.log("error: " + error);
    });
  }

  async showlista() {
    await this.authService.getLista().subscribe(
      data=>{
        if(JSON.stringify(data) == "{}")
        {
          this.confirm = false;
          this.ausente = 0;
          this.presente = 0;
        } 
        else 
        {    
          this.confirm = true;
          for(let i=0; i<data.length;i++)
          {
            this.motivo[i] = data[i].motivo;
            if(data[i].presenca == 0)
            {
              this.presenca[i] = "Não estará presente";
              this.ausente++;
            }
            else{
              this.presenca[i]= "Estará presente";
              this.presente++;
            }
            this.id_user[i] = data[i].id_user;
            this.authService.getUsers(this.id_user[i]).subscribe(resul=>{
              this.name[i] = resul[0].first_name+this.aux+resul[0].last_name;
            });
          }
        }
    },
    error=>{
      console.log(error);
    });
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
  //#endregion

  //#region cadastra
  async cadastrarinfo()
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
            this.addinfo(form.info);
          }
        }
      ]
    });
    await alertTeste.present();
  }

  async addinfo(info:any){
    this.authService.user().subscribe(data=>{
      this.authService.informativo(info,data.id,1).subscribe(
        data=> {
          this.alertService.presentToast("Informativo criado com sucesso!");
          window.location.reload();
        }
      )
    })
  }

  async cadastrarordem()
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
            this.addordem(form.ordem);
          }
        }
      ]
    });
    await alertTeste.present();
  }

  async addordem(ordem:any){
    this.authService.user().subscribe(data=>{
      this.authService.ordem(ordem,data.id,1).subscribe(
        data=> {
          this.alertService.presentToast("Ordem criada com sucesso!");
          window.location.reload();
        }
      )
    })
  }

  cadastraragape(){

  }
  //#endregion
}
