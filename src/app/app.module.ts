import { EditpresencaPageModule } from './pwa-pages/edit/editpresenca/editpresenca.module';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import {DatePipe} from '@angular/common';
import { EditordemPageModule } from './pwa-pages/edit/editordem/editordem.module';
import { EditinfoPageModule } from './pwa-pages/edit/editinfo/editinfo.module';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    IonicStorageModule.forRoot({
      name: 'new',
      driverOrder: ['localstorage', 'websql', 'sqlite' ]
    }),
    HttpClientModule,
    EditordemPageModule, EditinfoPageModule, EditpresencaPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
