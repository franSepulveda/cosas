import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { IonicModule } from '@ionic/angular';

import { DetalleProductoPageRoutingModule } from './detalle-producto-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DetalleProductoPage } from './detalle-producto.page';
import { ApiProyectoService } from '../../servicio/api-proyecto.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    IonicModule,
    DetalleProductoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DetalleProductoPage],
  providers: [ApiProyectoService]
})
export class DetalleProductoPageModule {}
