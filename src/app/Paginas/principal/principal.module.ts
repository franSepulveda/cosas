import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrincipalPageRoutingModule } from './principal-routing.module';

import { PrincipalPage } from './principal.page';
import { HttpClientModule } from '@angular/common/http';
import {ApiProyectoService } from './../../servicio/api-proyecto.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    IonicModule,
    PrincipalPageRoutingModule
  ],
  declarations: [PrincipalPage],
  providers: [ApiProyectoService]
})
export class PrincipalPageModule {}
