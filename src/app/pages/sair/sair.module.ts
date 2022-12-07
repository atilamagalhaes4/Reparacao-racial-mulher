import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SairPageRoutingModule } from './sair-routing.module';

import { SairPage } from './sair.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SairPageRoutingModule
  ],
  declarations: [SairPage]
})
export class SairPageModule {}
