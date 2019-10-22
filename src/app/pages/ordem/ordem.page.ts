import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ordem',
  templateUrl: './ordem.page.html',
  styleUrls: ['./ordem.page.scss'],
})
export class OrdemPage implements OnInit {
  public ordem: any[] = [];
  constructor(public authService: AuthService) { }

  ngOnInit() {
    
  }
  ionViewWillEnter(){this.showordem();}
  async showordem() {
    this.authService.user().subscribe(resul=>{
      //pega o nivel do usuario
      this.authService.getNivelOrdem(resul.nivel)
      .subscribe(
      data =>{
        for(let i=0; i<data.length;i++)
        {
         this.ordem[i] = data[i].ordem
        }
      });
    });
  }
}
