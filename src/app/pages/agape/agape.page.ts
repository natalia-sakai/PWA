import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agape',
  templateUrl: './agape.page.html',
  styleUrls: ['./agape.page.scss'],
})
export class AgapePage implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
    
  }
  ionViewWillEnter(){this.showagape();}
  public agape: any[] = [];
  async showagape() {
    await this.authService.getAgape()
    .subscribe(
      data =>{
        for(let i=0; i<data.length; i++){
          this.agape[i]=data[i].agape;
        }
      }, 
      error=>{
        console.log(error);
      }
    );
  }

}
