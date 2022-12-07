import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SairPage } from './sair.page';

const routes: Routes = [
  {
    path: '',
    component: SairPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SairPageRoutingModule {}
