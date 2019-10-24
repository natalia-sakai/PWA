import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editpresenca',
  templateUrl: './editpresenca.page.html',
  styleUrls: ['./editpresenca.page.scss'],
})
export class EditpresencaPage implements OnInit {

  private id:any;
  private presenca:any;
  public checked1 = "false";
  public checked2 = "false";
  public motivo:any;
  public name:any;
  public aux = " ";
  constructor(private modalCtrl: ModalController, private navParams: NavParams,
    private authService: AuthService, private alertService: AlertService
    ) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.showlista();
  }
  showlista() {
    this.id = this.navParams.get('id');
    this.authService.getLista().subscribe(
      data=>{
        for(let i=0; i<data.length;i++)
        {
          //pega na lista onde a reuniao esta ativa, o id do usuario
          if(this.id == data[i].id){
            this.presenca = data[i].presenca;
            this.motivo = data[i].motivo;
            switch (this.presenca)
            {
              case 1: 
                this.checked1 = "true";
                break;
              case 0:
                this.checked2 = "true";
                break;
            }
            this.authService.getUsers(data[i].id_user).subscribe(resul=>{
              this.name = resul[0].first_name+this.aux+resul[0].last_name;
            });
          }
        }
    },
    error=>{
      console.log(error);
    });
  }
  dismiss(){
    this.modalCtrl.dismiss();
  }
  
  async editar(form:any){
    console.log(form.value.presenca, form.value.motivo, this.id);
    await this.authService.getLista().subscribe(
    data=>{
      for(let i=0; i<data.length;i++)
      {
        //checa o id da lista
        if(this.id == data[i].id)
        {
          this.authService.updatelista(data[i].id, form.value.motivo, form.value.presenca).subscribe(
            data=>{
              console.log(data);
              this.dismiss();
              window.location.reload();
              this.alertService.presentToast("Presença editado com sucesso!");
            },
            error=>{
              console.log(error);
            }
          );
        }
      }
  },
  error=>{
    console.log(error);
  });
  }
}
