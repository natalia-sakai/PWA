import { GlobalService } from './../../../services/global.service';
import { Storage } from '@ionic/storage';
import { AlertService } from './../../../services/alert.service';
import { NgForm } from '@angular/forms';
import { AuthService } from './../../../services/auth.service';
import { ModalController, AlertController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editdados',
  templateUrl: './editdados.page.html',
  styleUrls: ['./editdados.page.scss'],
})
export class EditdadosPage implements OnInit {

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
  public checked1 = "false";
  public checked2 = "false";
  public checked3 = "false";
  public cargo: any;
  public cargos:any[]=[];
  constructor(private authService: AuthService, private alertService: AlertService, 
    private navCtrl: NavController, private storage: Storage,private global: GlobalService, private modalCtrl: ModalController) { }

  ngOnInit() {
    
  }
  ionViewWillEnter(){
    this.showdados();
  }
  dismiss(){
    this.modalCtrl.dismiss();
  }

  showdados()
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
      this.nivel = data.nivel;
      switch (this.nivel)
      {
        case 1: 
          this.checked1 = "true";
          break;
        case 2:
          this.checked2 = "true";
          break;
        case 3:
          this.checked3 = "true";
          break;
      }
      console.log(data.cargo_id);
      this.authService.getIdCargos(data.cargo_id).subscribe(resul =>{
        this.cargo = resul;
      });
    }, error=>{ 
      console.log("error: " + error);
    });

    this.authService.getCargos().subscribe(
      data=>{ 
        for(let i=0; i<data.length; i++){
          this.cargos[i]=data[i].cargo;
        }
      }
      , error=>{ 
        console.log("error: " + error);
      });
  }

  editar(form: NgForm)
  {
    this.authService.getCargos().subscribe(data=>{
      for(let i=0; i<data.length; i++){
        if(data[i].cargo == form.value.cargo)
        {
          this.global.cargo = data[i].id;
          this.storage.set('cargo', data[i].id);
        }
      }
    });
    this.authService.user()
    .subscribe(
    data=>{ 
      this.id = data.id;
      this.authService.updateuser(this.id,form.value.fName, form.value.lName, form.value.email, form.value.endereco, form.value.cidade, form.value.estado, form.value.data_nasc, form.value.telefone, form.value.nivel, this.global.cargo).subscribe(
        resp => {
        },
        error => {
          this.alertService.presentToast('E-mail já registrado!');
        },
        () => {
          this.alertService.presentToast('Usuário atualizado!');
          this.navCtrl.navigateRoot('/account');
        }
      );
    }
    , error=>{ 
      console.log("error: " + error);
    });

  }
}
