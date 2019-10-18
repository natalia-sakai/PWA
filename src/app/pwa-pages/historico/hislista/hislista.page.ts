import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-hislista',
  templateUrl: './hislista.page.html',
  styleUrls: ['./hislista.page.scss'],
})
export class HislistaPage implements OnInit {
  public id:any;
  public data:any;
  public havedata:boolean;
  public confirm:boolean;
  public id_user:any[] = [];
  public motivo: any[] = [];
  public name: any[]=[];
  public presenca: any[] = [];
  public aux = " ";
  constructor(private router:ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
  }
  ionViewWillEnter()
  {
    this.showlista();
  }
  showlista(){
    this.router.queryParams.subscribe(params => {
      this.id = params["refresh"];
      this.authService.getAllLista(this.id).subscribe(
        data=>{   
          this.confirm = true;
          for(let i=0; i<data.length;i++)
          {
            this.motivo[i] = data[i].motivo;
            if(data[i].presenca == 0)
              this.presenca[i] = "Ausente";
            else
              this.presenca[i]= "Presente";
            this.id_user[i] = data[i].id_user;
            this.authService.getUsers(this.id_user[i]).subscribe(resul=>{
              this.name[i] = resul[0].first_name+this.aux+resul[0].last_name;
            });
          }
          this.handlelista();
      },
      error=>{
        console.log(error);
      });
    });
  }

  handlelista(){
    console.log(this.name);
  }
}
