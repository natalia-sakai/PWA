import { DatePipe } from '@angular/common';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hisagape',
  templateUrl: './hisagape.page.html',
  styleUrls: ['./hisagape.page.scss'],
})
export class HisagapePage implements OnInit {
  public agape: any[]=[];
  public date: any[]=[];
  public ativo: any[]=[];
  constructor(public authService: AuthService, private dataPipe: DatePipe) { }

  ngOnInit() {
  }
  ionViewWillEnter()
  {
    this.showagape();
  }
  async showagape() {
    await this.authService.getAllAgape().subscribe(
      data=>{
        
        for(let i=0; i<data.length;i++)
        {
          this.agape[i]=data[i].agape;
          this.date[i]=(this.dataPipe.transform(data[i].data, "dd/MM/yyyy"));
          if(data[i].ativo == 1)
            this.ativo[i] = "Sim";
          else  
            this.ativo[i] = "Não";
        }
    },
    error=>{
      console.log(error);
    });
  }
}
