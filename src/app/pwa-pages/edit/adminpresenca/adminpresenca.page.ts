import { NavController } from '@ionic/angular';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminpresenca',
  templateUrl: './adminpresenca.page.html',
  styleUrls: ['./adminpresenca.page.scss'],
})
export class AdminpresencaPage implements OnInit {
  public data:any;
  public confirm:boolean;
  public id_user:any[] = [];
  public motivo: any[] = [];
  public name: any[]=[];
  public presenca: any[] = [];
  public aux = " ";
  public cor;

  constructor(private authService: AuthService, private navCtrl: NavController) { }

  ngOnInit() {
  }
  ionViewWillEnter()
  {
    this.showdata();
    this.showlista();
  }
  async showdata()
  {
    //mostra a data se tiver
    await this.authService.getReuniao()
    .subscribe(
    data=>{ 
        this.data = JSON.stringify(data);
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
              this.cor = "danger";
            }
            else{
              this.presenca[i]= "Estará presente";
              this.cor="success";
            }
            this.id_user[i] = data[i].id_user;
            this.authService.getUsers(this.id_user[i]).subscribe(resul=>{
              this.name[i] = resul[0].first_name+this.aux+resul[0].last_name;
            });
          }
          this.handlelista();
        }
    },
    error=>{
      console.log(error);
    });
  }

  handlelista()
  {
    console.log(this.name);
  }

  historico()
  {
    this.navCtrl.navigateForward('/hispresenca');
  }
}
