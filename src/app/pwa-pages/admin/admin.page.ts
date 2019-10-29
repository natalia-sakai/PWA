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
  public presente: Number;
  public ausente: Number;
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
    this.authService.getPresente().subscribe(presente =>{
      this.presente = presente;
    });
    this.authService.getAusente().subscribe(ausente =>{
      this.ausente = ausente;
    })
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

}
