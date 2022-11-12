import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./Paginas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./Paginas/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'principal',
    loadChildren: () => import('./Paginas/principal/principal.module').then( m => m.PrincipalPageModule)
  },
  {
    path: 'listarAdmin',
    loadChildren: () => import('./Paginas/listar-admin/listar-admin.module').then(m => m.ListarAdminPageModule)
  },
  {
    path:'agregarAdmin',
    loadChildren: () => import('./Paginas/agregar-admin/agregar-admin.module').then(m => m.AgregarAdminPageModule)
  },
  {
    path:'modificarAdmin/:idProducto',
    loadChildren: () => import('./Paginas/modificar-admin/modificar-admin.module').then(m => m.ModificarAdminPageModule)
  },
  {
    path:'eliminarAdmin/:idProducto',
    loadChildren: () => import('./Paginas/eliminar-admin/eliminar-admin.module').then(m=>m.EliminarAdminPageModule)
  },
  {
    path: 'carrito/:idUsuario',
    loadChildren: () => import('./Paginas/carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'detalleProducto/:idProducto',
    loadChildren: () => import('./Paginas/detalle-producto/detalle-producto.module').then( m => m.DetalleProductoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
