import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { IonicModule } from '@ionic/angular';
import {ApiProyectoService } from './../../servicio/api-proyecto.service';
import { ListarAdminPageRoutingModule } from './listar-admin-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { ListarAdminPage } from './listar-admin.page';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    IonicModule,
    ListarAdminPageRoutingModule
  ],
  declarations: [ListarAdminPage],
  providers: [ApiProyectoService]
})
export class ListarAdminPageModule {}
