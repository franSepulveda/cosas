import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarritoPageRoutingModule } from './carrito-routing.module';

import { CarritoPage } from './carrito.page';
import { ApiProyectoService } from '../../servicio/api-proyecto.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    IonicModule,
    CarritoPageRoutingModule
  ],
  declarations: [CarritoPage],
  providers: [ApiProyectoService]
})
export class CarritoPageModule {}
