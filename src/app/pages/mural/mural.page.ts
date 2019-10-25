import { AlertService } from 'src/app/services/alert.service';
import { EditmuralPage } from './../../pwa-pages/edit/editmural/editmural.page';
import { CadastramuralPage } from './../../pwa-pages/cadastra/cadastramural/cadastramural.page';
import { ModalController } from '@ionic/angular';
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
  public disabled1=true;
  constructor(private authService:AuthService, private modalCtrl: ModalController,
    private alertService: AlertService
    ) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.showmural();
    this.permissao();
  }
  permissao(){
    this.authService.user().subscribe(data=>{
      if(data.cargo_id == 11 || data.cargo_id == 8 || data.cargo_id ==4){
        this.disabled1 = false;
      }
    });
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
          this.authService.getNome(data[i].id_users).subscribe(resul=>{
             this.mural[i].nome = resul;
          });
        }
    });
  }

  async cadastrar(){
    const cadastrar = await this.modalCtrl.create({
      component: CadastramuralPage
    });
    return await cadastrar.present();
  }

  async editar(id:any){
    const editar = await this.modalCtrl.create({
      component: EditmuralPage,
      componentProps:{
        id: id,
        other: {couldAlsoBeAnObject: true}
      }
    });
    return await editar.present();
  }

  delete(id:any){
    this.authService.deletemural(id).subscribe(data=>{
      window.location.reload();
      this.alertService.presentToast("Postagem excluída com sucesso!");
    });
  }
}
