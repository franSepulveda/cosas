import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EliminarAdminPageRoutingModule } from './eliminar-admin-routing.module';

import { EliminarAdminPage } from './eliminar-admin.page';
import { HttpClientModule } from '@angular/common/http';
import { ApiProyectoService } from '../../servicio/api-proyecto.service';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    
    HttpClientModule,
    EliminarAdminPageRoutingModule
  ],
  declarations: [EliminarAdminPage],
  providers: [ApiProyectoService]
})
export class EliminarAdminPageModule {}
