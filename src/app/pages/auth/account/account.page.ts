import { EditsenhaPage } from './../editsenha/editsenha.page';
import { EditdadosPage } from './../editdados/editdados.page';
import { AuthService } from '../../../services/auth.service';
import { ToastController, MenuController, AlertController, ActionSheetController, ModalController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  lname:any;
  fname:any;
  email: any;
  endereco: any;
  cidade: any;
  estado: any
  telefone: any;
  data_nasc: any;
  constructor(private authService : AuthService, private navCtrl : NavController) {
   }

  ngOnInit() {
    this.showuser();
  }
  
  async showuser()
  {
    await this.authService.user()
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
    }
    , error=>{ 
      console.log("error: " + error);
    });
  }

  async editardados(){
    this.navCtrl.navigateRoot('/editdados');
  }

  async editarsenha(){
    this.navCtrl.navigateRoot('/editsenha');
  }
  

}
