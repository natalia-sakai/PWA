import { EditsenhaPage } from './../editsenha/editsenha.page';
import { EditdadosPage } from './../editdados/editdados.page';
import { AuthService } from '../../../services/auth.service';
import { ToastController, MenuController, AlertController, ActionSheetController, ModalController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  public fname: any;
  public lname: any;
  public email: any;
  public endereco: any;
  public cidade: any;
  public estado: any
  public telefone: any;
  public data_nasc: any;
  public id: any;
  public nivel:any;
  public cargo: any;
  constructor(private authService : AuthService, private modalCtrl: ModalController) {
   }

  ngOnInit() {
    
  }
  ionViewWillEnter(){
    this.showuser();
  }
  showuser()
  {
    this.authService.user()
    .subscribe(
    data=>{ 
      this.fname = data.first_name.replace("\"", "");
      this.lname = data.last_name.replace("\"", "");
      this.email = data.email.replace("\"", "");
      this.endereco = data.endereco.replace("\"", "");
      this.cidade = data.cidade.replace("\"", "");
      this.estado = data.estado.replace("\"", "");
      this.telefone = data.telefone.replace("\"", "");
      this.data_nasc = data.data_nasc.replace("\"", "");
      this.authService.getIdCargos(data.cargo_id).subscribe(resul =>{
        this.cargo = resul;
      });
      if(data.nivel == 1)
        this.nivel = "Aprendiz";
      else if(data.nivel == 2)
        this.nivel = "Companheiro";
      else if(data.nivel == 3)
        this.nivel = "Mestre"
    }
    , error=>{ 
      console.log("error: " + error);
    });
  }

  async editardados(){
    const editar = await this.modalCtrl.create({
      component: EditdadosPage
    });
    return await editar.present();
  }

  async editarsenha(){
    const editar = await this.modalCtrl.create({
      component: EditsenhaPage
    });
    return await editar.present();
  }
  

}
