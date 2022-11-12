import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario, UsuarioID } from './../Modelos/usuario';
import { Producto, ProductoID, ProductoParcial } from './../Modelos/producto';
import { Carrito } from './../Modelos/carrito';
import { Observable, BehaviorSubject, } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiProyectoService {

  public urlUsuarios = 'http://localhost:3000/Usuarios';
  private url_producto = 'http://localhost:3000/productos';
  public urlCarrito = 'http://localhost:3000/Carritos';
  private paginaActual = 1;

  private comLista = new BehaviorSubject<Array<ProductoID>>([]);

 

  public TotalPagar = 0;

  public listaProductos$ = this.comLista.asObservable();
  constructor(
    private cliente: HttpClient
  ) { }

  

  public listarPrimerosElementos() {
    this.cliente.get<Array<ProductoID>>(`${this.url_producto}?_page=1`)
      .subscribe(datos => {

        this.paginaActual = this.paginaActual + 1;
        this.comLista.next(datos);
      });
  }


  public obtenerMasElementos() {
    this.cliente.get<Array<ProductoID>>(`${this.url_producto}?_page=${this.paginaActual}`)
      .pipe(
        delay(3000)
      )
      .subscribe(datos => {

        if (datos) {
          this.paginaActual = this.paginaActual + 1;
          this.comLista.next(this.comLista.getValue().concat(datos));
        }

      })
  }

  public obtenerProductoPorID(id: number): Observable<ProductoID | null> {
    return this.cliente.get<ProductoID | null>(`${this.url_producto}/${id}`);
  }

  public obtenerUsuarioPorID(id: number): Observable<UsuarioID | null> {
    return this.cliente.get<UsuarioID | null>(`${this.urlUsuarios}/${id}`);

  }

  public agregarProducto(producto: Producto) {
    return this.cliente.post(this.url_producto, producto, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    })
  }

  public agregarCarrito(carrito: Carrito) {
    return this.cliente.post(this.urlCarrito, carrito, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    })
  }

  public eliminarProductoPorID(id: number): Observable<any> {
    return this.cliente.delete(`${this.url_producto}/${id}`)
  }

  public modificarPorID(id: number, payload: ProductoParcial): Observable<any> {
    return this.cliente.patch(`${this.url_producto}/${id}`, payload, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
  }

  public obtenerCarrito(id: any): Observable<Carrito> {
    return this.cliente.get<Carrito>(`${this.urlCarrito}?idUsuario=${id}`)
  }

  public ModificarCarro(id: number, payload: Carrito): Observable<any> {
    return this.cliente.patch(`${this.urlCarrito}/${id}`, payload, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })

  }

  public eliminarCarrito(id: number): Observable<any> {
    return this.cliente.delete(`${this.urlCarrito}/${id}`)
  }


  public agregarUsuario(usuario: Usuario) {
    return this.cliente.post(this.urlUsuarios, usuario, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    })
  }



  public obtenerProductoCarrito(id: any, idProducto: any): Observable<any> {
    return this.cliente.get(`${this.urlCarrito}?idUsuario=${id}&idProducto=${idProducto}`)
  }

  public nombreUsuario(nombre) {
    localStorage.setItem('usuario', nombre);
  }

  public retornarNombre() {
    return localStorage.getItem('usuario');
  }

  public idUSuario(id) {
    localStorage.setItem('ID', id);
  }

  public retornarId() {
    return localStorage.getItem('ID');
  }

  public borrarStorage(){
    localStorage.clear();
  }

  public conseguirCarro(id){
    return this.cliente.get<any>(`${this.urlCarrito}?idProducto=${id}`)
  }

}
