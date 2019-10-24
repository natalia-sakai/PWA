import { AlertService } from './../../../services/alert.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-cadastraagape',
  templateUrl: './cadastraagape.page.html',
  styleUrls: ['./cadastraagape.page.scss'],
})
export class CadastraagapePage implements OnInit {

  constructor(private authService: AuthService, private alertService:AlertService) { }

  ngOnInit() {
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
}
