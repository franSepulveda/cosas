import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {ApiProyectoService} from '../../servicio/api-proyecto.service';
import { IonicModule } from '@ionic/angular';
import {HttpClientModule} from '@angular/common/http';

import { SignUpPageRoutingModule } from './sign-up-routing.module';

import { SignUpPage } from './sign-up.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    SignUpPageRoutingModule,
    HttpClientModule
  ],
  declarations: [SignUpPage],
  providers:[ApiProyectoService]
})
export class SignUpPageModule {}
