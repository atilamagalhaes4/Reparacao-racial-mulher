import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiskDenunciaPageRoutingModule } from './disk-denuncia-routing.module';

import { DiskDenunciaPage } from './disk-denuncia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiskDenunciaPageRoutingModule
  ],
  declarations: [DiskDenunciaPage]
})
export class DiskDenunciaPageModule {}
