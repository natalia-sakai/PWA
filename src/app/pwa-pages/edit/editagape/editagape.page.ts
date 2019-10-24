import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editagape',
  templateUrl: './editagape.page.html',
  styleUrls: ['./editagape.page.scss'],
})
export class EditagapePage implements OnInit {

  constructor(private authService:AuthService, private alertService:AlertService) { }

  ngOnInit() {
  }

  async editar(novo:any, antigo:any, date:any){
    await this.authService.getAgape().subscribe(
    data=>{
      for(let i=0; i<data.length;i++)
      {
        if(antigo == data[i].agape && data[i].ativo == 1)
        {
          this.authService.updateagape(data[i].id, novo, 1, date).subscribe(
            data=>{
              this.alertService.presentToast("Ágape editado com sucesso!");
              window.location.reload();
            }
          )
        }
      }
  },
  error=>{
    console.log(error);
  });
  }
}
