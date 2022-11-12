import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {ApiProyectoService } from './../../servicio/api-proyecto.service';
import { IonicModule } from '@ionic/angular';



import { AgregarAdminPageRoutingModule } from './agregar-admin-routing.module';

import { AgregarAdminPage } from './agregar-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarAdminPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [AgregarAdminPage],
  providers: [ApiProyectoService]
  
})
export class AgregarAdminPageModule {}
