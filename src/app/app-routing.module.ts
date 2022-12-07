import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule) },
  { path: 'cadastro', loadChildren: () => import('./pages/cadastro/cadastro.module').then( m => m.CadastroPageModule) },
  { path: 'contato', loadChildren: () => import('./pages/contato/contato.module').then( m => m.ContatoPageModule) },
  { path: 'chat', loadChildren: () => import('./pages/chat/chat.module').then( m => m.ChatPageModule) },
  { path: 'sair', loadChildren: () => import('./pages/sair/sair.module').then( m => m.SairPageModule) },
  { path: 'visualizar-noticias/:id', loadChildren: () => import('./pages/visualizar-noticias/visualizar-noticias.module').then( m => m.VisualizarNoticiasPageModule) },
  { path: 'recuperar-senha', loadChildren: () => import('./pages/recuperar-senha/recuperar-senha.module').then( m => m.RecuperarSenhaPageModule) },
  { path: 'publicar-noticias', loadChildren: () => import('./pages/publicar-noticias/publicar-noticias.module').then( m => m.PublicarNoticiasPageModule) },
  { path: 'registro-alerta', loadChildren: () => import('./pages/registro-alerta/registro-alerta.module').then( m => m.RegistroAlertaPageModule) },
  { path: 'minha-conta', loadChildren: () => import('./pages/minha-conta/minha-conta.module').then( m => m.MinhaContaPageModule) },
  { path: 'disk-denuncia', loadChildren: () => import('./pages/disk-denuncia/disk-denuncia.module').then( m => m.DiskDenunciaPageModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
