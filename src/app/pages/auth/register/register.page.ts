import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { IfStmt, analyzeAndValidateNgModules } from '@angular/compiler';
import { Storage } from '@ionic/storage';
import { GlobalService } from 'src/app/services/global.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  aux: number;
  public dataregister = NgForm; //armazena os dados para caso precise
  public formulario: any;
  public cargos:any[] = [];
  public aventals:any[] = [];
  public ufs = 
  ['AC','AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private storage: Storage,
    private global: GlobalService
  ) 
  {}

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getcargos();
    this.getavental();
  }
  landing() {
    this.navCtrl.navigateRoot('/home');
  }
  loginModal() {
    this.navCtrl.navigateRoot('/home');
  }
  auxtel:any;
  auxdata:any;
  daux:any;
  register(form: NgForm) {
    console.log(form.value);
    this.auxtel=form.value.telefone.replace(/\D+/g, '');
    this.auxdata=form.value.data_nasc;
    this.daux = this.auxdata.split('T')[0];

    this.authService.getAvental().subscribe(data=>{
      for(let i=0; i<data.length; i++){
        if(data[i].avental == form.value.avental)
        {
          this.storage.set('avental', data[i].id);
        }
      }
    });
    this.authService.getCargos().subscribe(data=>{
      for(let i=0; i<data.length; i++){
        if(data[i].cargo == form.value.cargo)
        {
          this.storage.set('cargo', data[i].id);
        }
      }
    });

    if(form.value.password != form.value.password_s)
    {
      this.alertService.presentToast("Senha incorreta!");
    }
    else{
      this.authService.register(form.value.fName, form.value.lName, form.value.email, form.value.password, 
        this.daux, this.global.cargo, this.global.avental, this.auxtel, form.value.endereco, 
        form.value.cidade, form.value.estado, form.value.nivel).subscribe(
        data => {
          
          this.authService.login(form.value.email, form.value.password).subscribe(
            data => {
            },
            error => {
              this.alertService.presentToast("Verifique se você preencheu os campos corretamente corretamente");
            },
            () => {
              this.navCtrl.navigateRoot('/dashboard');
            }
          );
          console.log(data);
          
        },
        error => {
          this.alertService.presentToast("Preencha todos os campos corretamente!");
        },
        () => {
          
        }
      );
      
    }
  }

  getcargos()
  {
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

  getavental(){
    this.authService.getAvental().subscribe(
      data=>{ 
        for(let i=0; i<data.length; i++){
          this.aventals[i]=data[i].avental;
        }
      }
      , error=>{ 
        console.log("error: " + error);
      });
  }
}
