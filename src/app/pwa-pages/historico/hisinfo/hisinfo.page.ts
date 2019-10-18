import { DatePipe } from '@angular/common';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hisinfo',
  templateUrl: './hisinfo.page.html',
  styleUrls: ['./hisinfo.page.scss'],
})
export class HisinfoPage implements OnInit {

  public info: any[]=[];
  public date: any[]=[];
  public ativo: any[]=[];
  constructor(public authService: AuthService, private dataPipe: DatePipe) { }

  ngOnInit() {
  }
  ionViewWillEnter()
  {
    this.showinfo();
  }
  async showinfo() {
    await this.authService.getAllInfo().subscribe(
      data=>{
        for(let i=0; i<data.length;i++)
        {
          this.info[i]=data[i].info;
          this.date[i]=(this.dataPipe.transform(data[i].created_at, "dd/MM/yyyy"));
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
