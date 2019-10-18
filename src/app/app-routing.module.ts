import { Platform, NavController, MenuController } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'home',loadChildren: './pwa-pages/home/home.module#HomePageModule'},
  { path: 'register', loadChildren: './pages/auth/register/register.module#RegisterPageModule' },
  { path: 'account', loadChildren: './pages/auth/account/account.module#AccountPageModule' },
  { path: 'editdados', loadChildren: './pages/auth/editdados/editdados.module#EditdadosPageModule' },
  { path: 'editsenha', loadChildren: './pages/auth/editsenha/editsenha.module#EditsenhaPageModule' },
  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule' },
  { path: 'financeiro', loadChildren: './pages/financeiro/financeiro.module#FinanceiroPageModule' },
  { path: 'ordem', loadChildren: './pages/ordem/ordem.module#OrdemPageModule' },
  { path: 'informativo', loadChildren: './pages/informativo/informativo.module#InformativoPageModule' },
  { path: 'work', loadChildren: './pages/work/work.module#WorkPageModule' },
  { path: 'agape', loadChildren: './pages/agape/agape.module#AgapePageModule' },
  { path: 'admin', loadChildren: './pwa-pages/admin/admin.module#AdminPageModule' },
  { path: 'adminordem', loadChildren: './pwa-pages/edit/adminordem/adminordem.module#AdminordemPageModule' },
  { path: 'admininfo', loadChildren: './pwa-pages/edit/admininfo/admininfo.module#AdmininfoPageModule' },
  { path: 'adminpresenca', loadChildren: './pwa-pages/edit/adminpresenca/adminpresenca.module#AdminpresencaPageModule' },
  { path: 'adminagape', loadChildren: './pwa-pages/edit/adminagape/adminagape.module#AdminagapePageModule' },
  { path: 'hisinfo', loadChildren: './pwa-pages/historico/hisinfo/hisinfo.module#HisinfoPageModule' },
  { path: 'hisordem', loadChildren: './pwa-pages/historico/hisordem/hisordem.module#HisordemPageModule' },
  { path: 'hisagape', loadChildren: './pwa-pages/historico/hisagape/hisagape.module#HisagapePageModule' },
  { path: 'hispresenca', loadChildren: './pwa-pages/historico/hispresenca/hispresenca.module#HispresencaPageModule' },
  { path: 'hislista', loadChildren: './pwa-pages/historico/hislista/hislista.module#HislistaPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
