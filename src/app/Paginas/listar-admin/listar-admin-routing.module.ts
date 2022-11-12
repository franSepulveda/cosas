import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarAdminPage } from './listar-admin.page';

const routes: Routes = [
  {
    path: '',
    component: ListarAdminPage
  },
  {
    path: 'agregarAdmin',
    loadChildren: () => import('../agregar-admin/agregar-admin.module').then(m => m.AgregarAdminPageModule)
  },
  {
    path: 'modificarAdmin',
    loadChildren: () => import('../modificar-admin/modificar-admin.module').then(m => m.ModificarAdminPageModule)
  },
  {
    path: 'eliminarAdmin',
    loadChildren: () => import('../eliminar-admin/eliminar-admin.module').then(m => m.EliminarAdminPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarAdminPageRoutingModule { }
