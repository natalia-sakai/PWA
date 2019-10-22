import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { Platform, NavController, MenuController } from '@ionic/angular';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private platform: Platform,
    private menu: MenuController
    ){
      this.menu.enable(false);
    }
  ionViewWillEnter() {
    this.authService.getToken().then(() => {
      if(this.authService.isLoggedIn) {
        this.platform.ready().then(() => {
          if(this.platform.is('cordova')||this.platform.is('android')||this.platform.is('ios'))
          {
            this.navCtrl.navigateRoot('/dashboard');
          }
          else if(this.platform.is('pwa')||this.platform.is('capacitor')||this.platform.is('desktop'))
          {
            this.navCtrl.navigateRoot('/admin');
          }
        });
      }
    });
  }
  login(form: NgForm) {
    this.authService.login(form.value.email, form.value.password).subscribe(
      data => {
        this.authService.token = data['access_token'];
        this.alertService.presentToast("Logado!");
      },
      error => {
        console.log(error);
        this.alertService.presentToast('E-mail ou senha incorretos');
      },
      () => {
        if(this.platform.is('cordova')||this.platform.is('android')||this.platform.is('ios'))
        {
          this.navCtrl.navigateRoot('/dashboard');
        }
        else if(this.platform.is('pwa')||this.platform.is('capacitor')||this.platform.is('desktop'))
        {
          this.navCtrl.navigateRoot('/admin');
        }
      }
    );
  }

  register()
  {
    this.navCtrl.navigateRoot('/register');
  }
}
