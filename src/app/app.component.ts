import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';

import { Platform, MenuController, NavController, IonSplitPane, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/dashboard',
      icon: 'home'
    },
    {
      title: 'Informativos',
      url: '/informativo',
      icon: 'paper'
    },
    {
      title: 'Ágape',
      url: '/agape',
      icon: 'list'
    },
    {
      title: 'Ordem do dia',
      url: '/ordem',
      icon: 'today'
    },
    {
      title: 'Financeiro',
      url: '/financeiro',
      icon: 'cash'
    },
    {
      title: 'Work to do',
      url: '/work',
      icon: 'bookmark'
    },
    {
      title: 'My account',
      url: '/account',
      icon: 'contact'
    }
  ];
  public appPage = [
    {
      title: 'Home',
      url: '/admin',
      icon: 'home'
    },
    {
      title: 'Lista de presença',
      url: '/adminpresenca',
      icon: 'list-box'
    },
    {
      title: 'Informativos',
      url: '/admininfo',
      icon: 'paper'
    },
    {
      title: 'Ágape',
      url: '/adminagape',
      icon: 'list'
    },
    {
      title: 'Ordem do dia',
      url: '/adminordem',
      icon: 'today'
    },
    {
      title: 'Financeiro',
      url: '/adminfinanceiro',
      icon: 'cash'
    },
    {
      title: 'My account',
      url: '/account',
      icon: 'contact'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController,
    private navCtrl: NavController,
    private authService: AuthService,
    private alertService: AlertService,
    private alertCtrl : AlertController
  ) {
    this.initializeApp();
  }
  public disabled: boolean;
  initializeApp() {
    this.platform.ready().then(() => {
      if(this.platform.is('cordova')||this.platform.is('android')||this.platform.is('ios'))
      {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        this.disabled = false;
        //fazer verificação do login tbm
        this.menu.enable(true, 'app');
        this.menu.enable(false, 'web');
      }
      else if(this.platform.is('pwa')||this.platform.is('capacitor')||this.platform.is('desktop'))
      {
        this.disabled = true;
        this.menu.enable(true, 'web');
        this.menu.enable(false, 'app');
      }
    });

    this.authService.reuniao().subscribe(data=>{
      console.log(data);
    });

    this.authService.getToken();
  }
  async logout() {
    let alert = await this.alertCtrl.create({
      header: 'Deseja mesmo sair?',
      buttons: [
        {
          text: 'Não',
          role:'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Sim',
          handler: ()=>{
            this.authService.logout().subscribe(
              data => {
                this.alertService.presentToast(data['message']); 
                window.location.reload();      
              },
              error => {
                console.log(error);
              },
              () => {
                this.navCtrl.navigateRoot('/home');
              }
            );
          } 
        }
      ]
    });
    await alert.present();
  }
  
}
