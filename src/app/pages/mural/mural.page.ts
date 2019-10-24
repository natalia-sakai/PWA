import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mural',
  templateUrl: './mural.page.html',
  styleUrls: ['./mural.page.scss'],
})
export class MuralPage implements OnInit {
  public mural:any[]=[];
  public aux = " ";
  constructor(public authService:AuthService) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.showmural();
  }

  async showmural(){
    this.authService.getMural().subscribe(
      data=>{
        for(let i=0; i<data.length;i++){
          this.mural[i] = data[i];
          this.authService.user().subscribe(param=>{
            if(data[i].id_users == param.id)
              this.mural[i].ativo = 1;
            else
              this.mural[i].ativo = 0;
          });
          this.authService.getUsers(data[i].id_users).subscribe(resul=>{
             this.mural[i].nome = resul[0].first_name+this.aux+resul[0].last_name;
          });
        }
    });
  }

  cadastrar(){

  }

  editar(form:any){

  }

  delete(form:any){
    
  }
}
