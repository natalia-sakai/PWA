
import { Response } from 'selenium-webdriver/http';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-informativo',
  templateUrl: './informativo.page.html',
  styleUrls: ['./informativo.page.scss'],
})
export class InformativoPage implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
    
  }
  ionViewWillEnter(){
    this.showinfo();
  }
  public info: any[] = [];
  async showinfo() {
    this.authService.user().subscribe(resul=>{
      //pega o nivel do usuario
      this.authService.getNivelInfo(resul.nivel)
      .subscribe(
      data =>{
        for(let i=0; i<data.length;i++)
        {
         this.info[i] = data[i].info
        }
      });
    });
  }
}
