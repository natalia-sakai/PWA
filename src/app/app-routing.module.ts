import { AppRoutingPreloaderService } from './route-to-preload';
import { Platform, NavController, MenuController } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  //geral
  { path: 'home',loadChildren: './pwa-pages/home/home.module#HomePageModule'},
  { path: 'register', loadChildren: './pages/auth/register/register.module#RegisterPageModule' },
  { path: 'account', loadChildren: './pages/auth/account/account.module#AccountPageModule', canActivate: [AuthGuard]},
  { path: 'editdados', loadChildren: './pages/auth/editdados/editdados.module#EditdadosPageModule', data: {preload: true}, canActivate: [AuthGuard] },
  { path: 'editsenha', loadChildren: './pages/auth/editsenha/editsenha.module#EditsenhaPageModule', data: {preload: true}, canActivate: [AuthGuard] },
  { path: 'mural', loadChildren: './pages/mural/mural.module#MuralPageModule', data: {preload: true}, canActivate: [AuthGuard] },
  //app
  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule', data: {preload: true}, canActivate: [AuthGuard] },
  { path: 'financeiro', loadChildren: './pages/financeiro/financeiro.module#FinanceiroPageModule', canActivate: [AuthGuard] },
  { path: 'ordem', loadChildren: './pages/ordem/ordem.module#OrdemPageModule', canActivate: [AuthGuard] },
  { path: 'informativo', loadChildren: './pages/informativo/informativo.module#InformativoPageModule', canActivate: [AuthGuard] },
  { path: 'work', loadChildren: './pages/work/work.module#WorkPageModule', canActivate: [AuthGuard] },
  { path: 'agape', loadChildren: './pages/agape/agape.module#AgapePageModule', canActivate: [AuthGuard] },
  //web
  { path: 'admin', loadChildren: './pwa-pages/admin/admin.module#AdminPageModule', data: {preload: true}, canActivate: [AuthGuard] },
  { path: 'adminordem', loadChildren: './pwa-pages/administrador/adminordem/adminordem.module#AdminordemPageModule', canActivate: [AuthGuard] },
  { path: 'admininfo', loadChildren: './pwa-pages/administrador/admininfo/admininfo.module#AdmininfoPageModule', canActivate: [AuthGuard] },
  { path: 'adminpresenca', loadChildren: './pwa-pages/administrador/adminpresenca/adminpresenca.module#AdminpresencaPageModule', canActivate: [AuthGuard] },
  { path: 'adminagape', loadChildren: './pwa-pages/administrador/adminagape/adminagape.module#AdminagapePageModule', canActivate: [AuthGuard] },
  { path: 'adminfinanceiro', loadChildren: './pwa-pages/administrador/adminfinanceiro/adminfinanceiro.module#AdminfinanceiroPageModule' },
  //historico
  { path: 'hisinfo', loadChildren: './pwa-pages/historico/hisinfo/hisinfo.module#HisinfoPageModule', data: {preload: true}, canActivate: [AuthGuard] },
  { path: 'hisordem', loadChildren: './pwa-pages/historico/hisordem/hisordem.module#HisordemPageModule', data: {preload: true}, canActivate: [AuthGuard] },
  { path: 'hisagape', loadChildren: './pwa-pages/historico/hisagape/hisagape.module#HisagapePageModule', data: {preload: true}, canActivate: [AuthGuard] },
  { path: 'hispresenca', loadChildren: './pwa-pages/historico/hispresenca/hispresenca.module#HispresencaPageModule', data: {preload: true}, canActivate: [AuthGuard] },
  { path: 'hislista', loadChildren: './pwa-pages/historico/hislista/hislista.module#HislistaPageModule', data: {preload: true}, canActivate: [AuthGuard] },
  { path: 'hisfinanceiro', loadChildren: './pwa-pages/historico/hisfinanceiro/hisfinanceiro.module#HisfinanceiroPageModule', data: {preload: true}, canActivate: [AuthGuard] },
  //cadastro
  { path: 'cadastraordem', loadChildren: './pwa-pages/cadastra/cadastraordem/cadastraordem.module#CadastraordemPageModule', data: {preload: true}, canActivate: [AuthGuard] },
  { path: 'cadastrainfo', loadChildren: './pwa-pages/cadastra/cadastrainfo/cadastrainfo.module#CadastrainfoPageModule', data: {preload: true}, canActivate: [AuthGuard] },
  { path: 'cadastrafinanceiro', loadChildren: './pwa-pages/cadastra/cadastrafinanceiro/cadastrafinanceiro.module#CadastrafinanceiroPageModule', data: {preload: true}, canActivate: [AuthGuard] },
  { path: 'cadastraagape', loadChildren: './pwa-pages/cadastra/cadastraagape/cadastraagape.module#CadastraagapePageModule', data: {preload: true}, canActivate: [AuthGuard] },
  //edição
  { path: 'editordem', loadChildren: './pwa-pages/edit/editordem/editordem.module#EditordemPageModule', data: {preload: true}, canActivate: [AuthGuard] },
  { path: 'editinfo', loadChildren: './pwa-pages/edit/editinfo/editinfo.module#EditinfoPageModule', data: {preload: true}, canActivate: [AuthGuard] },
  { path: 'editagape', loadChildren: './pwa-pages/edit/editagape/editagape.module#EditagapePageModule', data: {preload: true}, canActivate: [AuthGuard] },
  { path: 'editpresenca', loadChildren: './pwa-pages/edit/editpresenca/editpresenca.module#EditpresencaPageModule', data: {preload: true}, canActivate: [AuthGuard] },  { path: 'cadastramural', loadChildren: './pwa-pages/cadastra/cadastramural/cadastramural.module#CadastramuralPageModule' },
  { path: 'editmural', loadChildren: './pwa-pages/edit/editmural/editmural.module#EditmuralPageModule' }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: AppRoutingPreloaderService })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
