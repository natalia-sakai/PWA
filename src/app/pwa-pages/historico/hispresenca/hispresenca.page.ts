import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NavController } from '@ionic/angular';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-hispresenca',
  templateUrl: './hispresenca.page.html',
  styleUrls: ['./hispresenca.page.scss'],
})
export class HispresencaPage implements OnInit {
  public data:any[] = [];
  public id:any;

  
  constructor(private authService: AuthService, private dataPipe: DatePipe, private navCtrl: NavController) { }

  ngOnInit() {
  }
  ionViewWillEnter()
  {
    this.showdata();
  }
  async showdata()
  {
    await this.authService.getAllReuniao()
    .subscribe(
      resul=>{ 
        for(let i=0; i<resul.length;i++){
          //pega a data da reuniao
          this.data[i] = (this.dataPipe.transform(resul[i].data, "dd/MM/yyyy"));
        }
      }
    , error=>{ 
      console.log("error: " + error);
    });
  }

  lista(datas:any){
    this.authService.getAllReuniao()
    .subscribe(
      resul=>{ 
        for(let i=0; i<resul.length;i++){
          if(datas == (this.dataPipe.transform(resul[i].data, "dd/MM/yyyy")))
          {
            this.id = resul[i].id;
            let navigationExtras: NavigationExtras = {
              queryParams: {
                  refresh: this.id
              }
            };
            this.navCtrl.navigateForward(['/hislista'], navigationExtras);
          }
        }
      });
  }
}
