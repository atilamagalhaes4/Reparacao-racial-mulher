import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiskDenunciaPage } from './disk-denuncia.page';

const routes: Routes = [
  {
    path: '',
    component: DiskDenunciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiskDenunciaPageRoutingModule {}
