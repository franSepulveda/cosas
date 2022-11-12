import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarAdminPageRoutingModule } from './modificar-admin-routing.module';

import { ModificarAdminPage } from './modificar-admin.page';

import { HttpClientModule } from '@angular/common/http';
import { ApiProyectoService } from '../../servicio/api-proyecto.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    ModificarAdminPageRoutingModule,
    HttpClientModule
  ],
  declarations: [ModificarAdminPage],
  providers: [ApiProyectoService]
})
export class ModificarAdminPageModule {}
