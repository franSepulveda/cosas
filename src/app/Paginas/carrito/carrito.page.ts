import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiProyectoService } from '../../servicio/api-proyecto.service';
import { Carrito } from 'src/app/Modelos/carrito';
import {ProductoID } from 'src/app/Modelos/producto';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  public idActiva: number = 0;
  public carrito: Carrito;
  public productoActivo!: ProductoID;
 
  public Total = 0;
  public cantidad2 = 0;
  public precioProducto = 0;


  
  constructor(
    private api: ApiProyectoService,
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private http: HttpClient

  ) { }

  ngOnInit() {
    this.rutaActiva.paramMap.subscribe(para => {
      this.idActiva = +para.get('idUsuario')
      this.api.obtenerCarrito(this.idActiva).subscribe(datos => {
        this.carrito = datos

      })

    })

    this.http.get<any>(`${this.api.urlCarrito}?idUsuario=${this.idActiva}`).subscribe(data => {
      const carritos = data.find((a: any) => {
        this.Total += a.total

        this.api.obtenerProductoPorID(a.idProducto).subscribe(data=>{
          this.productoActivo = data
        })
      })
    })

    

   

  }

 
  agregar(nombreProducto: string, idProducto: number, total: number, cantidad: number, idUsuario: number, idCarrito: number) {
    this.cantidad2 = cantidad + 1;
    this.precioProducto = total / cantidad
    const carrito: Carrito = {
      "idProducto": idProducto,
      "nombreProducto": nombreProducto,
      "cantidad": cantidad + 1,
      "total": this.precioProducto * this.cantidad2,
      "idUsuario": idUsuario
    }

    this.api.ModificarCarro(idCarrito, carrito).subscribe()
  }


  quitar(nombreProducto: string, idProducto: number, total: number, cantidad: number, idUsuario: number, idCarrito: number) {
    this.cantidad2 = total / cantidad;
    const carrito: Carrito = {
      "idProducto": idProducto,
      "nombreProducto": nombreProducto,
      "cantidad": cantidad - 1,
      "total": total - this.cantidad2,
      "idUsuario": idUsuario
    }

    if (carrito.cantidad == 0) {
      this.api.eliminarCarrito(idCarrito).subscribe(datos => {
        
      })
    }
    else {
      this.api.ModificarCarro(idCarrito, carrito).subscribe(datos => {
      })
    }

  }

  eliminarCarrito() {
    this.http.get<any>(`${this.api.urlCarrito}?idUsuario=${this.idActiva}`).subscribe(data => {
      const eliminar = data.find((a: any) => {
        this.api.eliminarCarrito(a.id).subscribe()
      })
      this.router.navigate(['carrito']);
    })

  }

}
