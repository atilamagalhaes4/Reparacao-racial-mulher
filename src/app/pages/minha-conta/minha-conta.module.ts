import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MinhaContaPageRoutingModule } from './minha-conta-routing.module';

import { MinhaContaPage } from './minha-conta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MinhaContaPageRoutingModule
  ],
  declarations: [MinhaContaPage]
})
export class MinhaContaPageModule {}
