import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisualizarNoticiasPageRoutingModule } from './visualizar-noticias-routing.module';

import { VisualizarNoticiasPage } from './visualizar-noticias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisualizarNoticiasPageRoutingModule
  ],
  declarations: [VisualizarNoticiasPage]
})
export class VisualizarNoticiasPageModule {}
