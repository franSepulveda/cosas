import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarritoPage } from './carrito.page';

const routes: Routes = [
  {
    path: '',
    component: CarritoPage
  },
  {
    path: 'carrito',
    loadChildren: () => import('./carrito.module').then( m => m.CarritoPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarritoPageRoutingModule {}
