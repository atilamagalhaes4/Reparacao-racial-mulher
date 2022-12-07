import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroAlertaPageRoutingModule } from './registro-alerta-routing.module';

import { RegistroAlertaPage } from './registro-alerta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroAlertaPageRoutingModule
  ],
  declarations: [RegistroAlertaPage]
})
export class RegistroAlertaPageModule {}
