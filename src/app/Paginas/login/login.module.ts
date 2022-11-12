import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {ApiProyectoService} from '../../servicio/api-proyecto.service';
import { IonicModule } from '@ionic/angular';
import {HttpClientModule} from '@angular/common/http';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    LoginPageRoutingModule,
    HttpClientModule
  ],
  declarations: [LoginPage],
  providers:[ApiProyectoService]
})
export class LoginPageModule {}
