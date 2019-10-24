import { NavController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hisfinanceiro',
  templateUrl: './hisfinanceiro.page.html',
  styleUrls: ['./hisfinanceiro.page.scss'],
})
export class HisfinanceiroPage implements OnInit {

  public financeiro:any[]=[];
  public mes:any;
  public situacao: number;
  public data_pag:any;
  constructor(private authService: AuthService, private datePipe: DatePipe, private navCtrl: NavController) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.showfinanceiro();
  }

  showfinanceiro(){
    this.authService.user().subscribe(data=>{
      this.authService.getAllFinanceiro(data.id).subscribe(resul=>{
        for(let i=0; i<resul.length; i++){
          this.financeiro[i] = resul[i];
          if(resul[i].data_pag == '0000-00-00'){
            this.financeiro[i].data_pag = "Aguardando"
          }
          else{
            this.financeiro[i].data_pag = this.datePipe.transform(resul[i].data_pag, "dd/MM");
          }
        }
      });
    });
  }

}
