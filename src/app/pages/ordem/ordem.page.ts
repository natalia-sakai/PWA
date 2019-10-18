import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ordem',
  templateUrl: './ordem.page.html',
  styleUrls: ['./ordem.page.scss'],
})
export class OrdemPage implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.showordem();
  }

  public ordem: any[] = [];
  
  async showordem() {
    await this.authService.getOrdem()
    .subscribe(
      data =>{
        for(let i=0; i<data.length;i++)
        {
          this.ordem[i]=data[i].ordem;
        }
      }, 
      error=>{
        console.log(error);
      }
    );
  }
}
