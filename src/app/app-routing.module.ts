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
  { path: 'home',loadChildren: './pwa-pages/home/home.module#HomePageModule'},
  { path: 'register', loadChildren: './pages/auth/register/register.module#RegisterPageModule' },
  { path: 'account', loadChildren: './pages/auth/account/account.module#AccountPageModule', canActivate: [AuthGuard]},
  { path: 'editdados', loadChildren: './pages/auth/editdados/editdados.module#EditdadosPageModule', canActivate: [AuthGuard] },
  { path: 'editsenha', loadChildren: './pages/auth/editsenha/editsenha.module#EditsenhaPageModule', canActivate: [AuthGuard] },
  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule', canActivate: [AuthGuard] },
  { path: 'financeiro', loadChildren: './pages/financeiro/financeiro.module#FinanceiroPageModule', canActivate: [AuthGuard] },
  { path: 'ordem', loadChildren: './pages/ordem/ordem.module#OrdemPageModule', canActivate: [AuthGuard] },
  { path: 'informativo', loadChildren: './pages/informativo/informativo.module#InformativoPageModule', canActivate: [AuthGuard] },
  { path: 'work', loadChildren: './pages/work/work.module#WorkPageModule', canActivate: [AuthGuard] },
  { path: 'agape', loadChildren: './pages/agape/agape.module#AgapePageModule', canActivate: [AuthGuard] },
  { path: 'admin', loadChildren: './pwa-pages/admin/admin.module#AdminPageModule', canActivate: [AuthGuard] },
  { path: 'adminordem', loadChildren: './pwa-pages/administrador/adminordem/adminordem.module#AdminordemPageModule', canActivate: [AuthGuard] },
  { path: 'admininfo', loadChildren: './pwa-pages/administrador/admininfo/admininfo.module#AdmininfoPageModule', canActivate: [AuthGuard] },
  { path: 'adminpresenca', loadChildren: './pwa-pages/administrador/adminpresenca/adminpresenca.module#AdminpresencaPageModule', canActivate: [AuthGuard] },
  { path: 'adminagape', loadChildren: './pwa-pages/administrador/adminagape/adminagape.module#AdminagapePageModule', canActivate: [AuthGuard] },
  { path: 'hisinfo', loadChildren: './pwa-pages/historico/hisinfo/hisinfo.module#HisinfoPageModule', canActivate: [AuthGuard] },
  { path: 'hisordem', loadChildren: './pwa-pages/historico/hisordem/hisordem.module#HisordemPageModule', canActivate: [AuthGuard] },
  { path: 'hisagape', loadChildren: './pwa-pages/historico/hisagape/hisagape.module#HisagapePageModule', canActivate: [AuthGuard] },
  { path: 'hispresenca', loadChildren: './pwa-pages/historico/hispresenca/hispresenca.module#HispresencaPageModule', canActivate: [AuthGuard] },
  { path: 'hislista', loadChildren: './pwa-pages/historico/hislista/hislista.module#HislistaPageModule', canActivate: [AuthGuard] },
  { path: 'adminfinanceiro', loadChildren: './pwa-pages/administrador/adminfinanceiro/adminfinanceiro.module#AdminfinanceiroPageModule' },
  { path: 'cadastraordem', loadChildren: './pwa-pages/cadastra/cadastraordem/cadastraordem.module#CadastraordemPageModule' },
  { path: 'editordem', loadChildren: './pwa-pages/edit/editordem/editordem.module#EditordemPageModule' },  { path: 'editinfo', loadChildren: './pwa-pages/edit/editinfo/editinfo.module#EditinfoPageModule' },
  { path: 'cadastrainfo', loadChildren: './pwa-pages/cadastra/cadastrainfo/cadastrainfo.module#CadastrainfoPageModule' },
  { path: 'cadastrafinanceiro', loadChildren: './pwa-pages/cadastra/cadastrafinanceiro/cadastrafinanceiro.module#CadastrafinanceiroPageModule' },
  { path: 'hisfinanceiro', loadChildren: './pwa-pages/historico/hisfinanceiro/hisfinanceiro.module#HisfinanceiroPageModule' },
  { path: 'cadastraagape', loadChildren: './pwa-pages/cadastra/cadastraagape/cadastraagape.module#CadastraagapePageModule' },
  { path: 'editagape', loadChildren: './pwa-pages/edit/editagape/editagape.module#EditagapePageModule' },
  { path: 'editpresenca', loadChildren: './pwa-pages/edit/editpresenca/editpresenca.module#EditpresencaPageModule' },
  { path: 'mural', loadChildren: './pages/mural/mural.module#MuralPageModule' }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
