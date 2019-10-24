import { Storage } from '@ionic/storage';
import { GlobalService } from './../../services/global.service';
import { Reuniao } from './../../model/reuniao';
import { EnvService } from './../../services/env.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertService } from './../../services/alert.service';
import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController, AlertController, ActionSheetController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { getLocaleDayNames, DatePipe } from '@angular/common';
import { stringify } from 'querystring';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  public id:any;
  public data_r:any;
  public opcao: Number;
  public p1="primary";
  public p2="danger";
  public disabled1=true;//desabilitado
  public disabled2=true;//desabilitado
  public disabled3=true;//desabilitado
  public reuniao:Reuniao = {id: null, data: '', ativo: 0};
  public motivo: any;
  public ordem: any[] = [];
  public info: any[] = [];
  public qtde=0;
  public agape: any[]=[];

  constructor(private navCtrl:NavController, private authService: AuthService, 
    private alertService: AlertService,private http: HttpClient,
    private env: EnvService, private route: ActivatedRoute,
    private alertCtrl: AlertController, private global:GlobalService,
    private storage: Storage,private dataPipe: DatePipe,
    private menu: MenuController
  ) { 
    this.menu.enable(true, 'app');
  }
  ngOnInit() {
    

  }
  ionViewWillEnter()
  {
    this.verifica();
    this.showdata();
    this.showordem();
    this.showinfo();
    this.presenca();
    this.showagape();
  }
  
  verifica(){ 
    //verifica se o usuario ja respondeu
    this.authService.getLista().subscribe(
      resp => {
        //verifica se esta vazio, se tiver permite q o usuario escolha a opcao
        if(JSON.stringify(resp)=="{}")
        {
          this.disabled1 = false;
          this.disabled2 = false;
          this.disabled3 = true;
        }
        else
        {
          this.disabled1 = true;
          this.disabled2 = true;
          for(let i=0; i<resp.length;i++)
          {
            if(JSON.stringify(resp[i].presenca) == '1')
            {
              this.p1 = "success";
              this.p2 = "primary";
            }
            else if(JSON.stringify(resp[i].presenca) == '0')
            {
              this.p2 = "success";
              this.p1 = "primary";
            }

            //se ja tiver algum motivo
            if(JSON.stringify(resp[i].motivo)!=null)
            {
              this.disabled3 = true;
            }
            else
            {
              this.disabled3 = false;
            }
          }
        }
      },
      error => {
        //se nao possui o id no banco de dados, deixa habilitado para o usuario
        console.log('erro na verificação');
        this.disabled1=false;
        this.disabled2=false;
      }
    );
  }
  async showdata()
  {
    //mostra a data se tiver
    await this.authService.getReuniao()
    .subscribe(
    resul=>{ 
        console.log(resul);
        this.data_r = (this.dataPipe.transform(resul[0].data, "dd/MM"));
        this.storage.set('reuniao', resul[0].id);
        this.disabled1=false;
        this.disabled2=false;
        this.verifica();
    }
    , error=>{ 
      console.log("error: " + error);
    });
  }

  resposta(resp: Number)
  {
    this.opcao = resp;
    if(this.opcao == 0)
    {
      this.disabled3 = false;
      this.bmotivo(this.opcao);
    }
    else{
      this.motivo = "-";
      this.lista(this.opcao, this.motivo);
    }
  }

  async bmotivo(opcao: Number)
  {
    //abre um pop
    let alertPrompt = await this.alertCtrl.create({
      header: 'Informe o motivo',
      inputs: [
        {
          name: 'motivo',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role:'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Enviar',
          handler: (data)=> {
            if(data.motivo == "")
              this.motivo = "Sem justificativa";
            else
              this.motivo = data.motivo;
            this.lista(this.opcao,this.motivo);
          }
        }
      ]
    });
    await alertPrompt.present();
  }

  async lista(opcao: Number, motivo: String)
  {
    await this.authService.user()
      .subscribe(
      data=>{ 
        this.id = data.id;
        //manda pra funcão o id do usuario e a resposta, se ja tiver no bd ele atualiza para uma nova resposta
        this.authService.confirma_presenca(this.id, this.opcao ,this.motivo,this.global.reuniao).subscribe(
          data => {},
          error => {
            console.log(error);
          },
          () => {
            this.alertService.presentToast('Confirmação enviada!');
            window.location.reload();
          }
        );
      }
      , error=>{ 
        console.log("error: " + error);
      });
  }
  editar()
  {
    
    this.disabled1 = false;
    this.disabled2 = false;
  }

  async showordem()
  {
    this.authService.user().subscribe(resul=>{
      //pega o nivel do usuario
      this.authService.getNivelOrdem(resul.nivel)
      .subscribe(
      data =>{
        for(let i=0; i<data.length;i++)
        {
         this.ordem[i] = data[i].ordem
        }
      });
    });
  }
  
  async showinfo()
  {
    await this.authService.getInfo()
    .subscribe(
      data =>{
        for(let i=0; i<data.length; i++){
          this.info[i]=data[i].info;
        }
      }, 
      error=>{
        console.log(error);
      }
    );
  }

  presenca()
  {
    this.authService.getLista().subscribe(
      data=>{
        if(JSON.stringify(data) == "{}")
        {
          this.qtde = 0;
        } 
        else 
        {    
          for(let i=0;i<data.length;i++)
          {
            if(data[i].presenca == 1)
              this.qtde++;
          }
        }
    },
    error=>{
      console.log(error);
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
}