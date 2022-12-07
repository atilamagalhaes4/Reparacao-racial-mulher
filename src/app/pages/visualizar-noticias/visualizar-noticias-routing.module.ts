import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisualizarNoticiasPage } from './visualizar-noticias.page';

const routes: Routes = [
  {
    path: '',
    component: VisualizarNoticiasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisualizarNoticiasPageRoutingModule {}
