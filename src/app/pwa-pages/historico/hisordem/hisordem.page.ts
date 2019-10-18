import { DatePipe } from '@angular/common';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hisordem',
  templateUrl: './hisordem.page.html',
  styleUrls: ['./hisordem.page.scss'],
})
export class HisordemPage implements OnInit {

  public ordem: any[]=[];
  public date: any[]=[];
  public ativo: any[]=[];
  constructor(public authService: AuthService, private dataPipe: DatePipe) { }

  ngOnInit() {
  }
  ionViewWillEnter()
  {
    this.showordem();
  }
  async showordem() {
    await this.authService.getAllOrdem().subscribe(
      data=>{
        for(let i=0; i<data.length;i++)
        {
          this.ordem[i]=data[i].ordem;
          this.date[i]=(this.dataPipe.transform(data[i].created_at, "dd/MM/yyyy"));
          if(data[i].ativo == 1)
            this.ativo[i] = "Sim";
          else  
            this.ativo[i] = "Não";
        }
        this.handleordem();
    },
    error=>{
      console.log(error);
    });
  }
  handleordem()
  {
    this.ordem;
    this.date;
    this.ativo;
  }
}
