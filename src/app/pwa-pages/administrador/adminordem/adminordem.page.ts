import { AppRoutingPreloaderService } from './../../../route-to-preload';
import { ActivatedRoute } from '@angular/router';
import { EditordemPage } from './../../edit/editordem/editordem.page';
import { CadastraordemPage } from '../../cadastra/cadastraordem/cadastraordem.page';
import { AlertController, NavController, ModalController } from '@ionic/angular';
import { AlertService } from '../../../services/alert.service';
import { AuthService } from '../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminordem',
  templateUrl: './adminordem.page.html',
  styleUrls: ['./adminordem.page.scss'],
})
export class AdminordemPage implements OnInit {
  public ordem: any[]=[];
  public disabled1=true;
  constructor(public authService: AuthService,
    private alertService: AlertService, 
    private alertCtrl:AlertController, 
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private router:ActivatedRoute, 
    private routingService: AppRoutingPreloaderService
    ) { }

  ngOnInit() {
    
  }
  async ionViewDidEnter() {
    await this.routingService.preloadRoute('editordem');
    await this.routingService.preloadRoute('cadastraordem');
    await this.routingService.preloadRoute('hisordem');
  }
  ionViewWillEnter(){
    this.showordem();
    this.permissao();
  }
  
  permissao(){
    this.authService.user().subscribe(data=>{
      if(data.cargo_id == 9 || data.cargo_id == 4){
        this.disabled1 = false;
      }
    });
  }
  async showordem() {
    await this.authService.getOrdem().subscribe(
      data=>{
        for(let i=0; i<data.length;i++)
        {
          this.ordem[i]=data[i];
        }
    },
    error=>{
      console.log(error);
    });
  }

  async cadastrar(){
    const cadastrar = await this.modalCtrl.create({
      component: CadastraordemPage
    });
    return await cadastrar.present();
  }

  async editar(id:any){
    const editar = await this.modalCtrl.create({
      component: EditordemPage, 
      componentProps:{
        id: id,
        other: {couldAlsoBeAnObject: true}
      }
    });
    return await editar.present();
  }

  async delete(id: any){
    await this.authService.getOrdem().subscribe(
      data=>{
        for(let i=0; i<data.length;i++)
        {
          if(id == data[i].id)
          {
            //muda o ativo para zero
            this.authService.updateordem(data[i].id, data[i].ordem, 0, data[i].nivel).subscribe(
              data=>{
                this.alertService.presentToast("Ordem excluido com sucesso!");
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

  historico(){
    this.navCtrl.navigateForward('/hisordem');
  }
}
