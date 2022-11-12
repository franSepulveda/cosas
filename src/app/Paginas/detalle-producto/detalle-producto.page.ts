import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Carrito } from 'src/app/Modelos/carrito';
import {  ProductoID } from '../../Modelos/producto';
import { ApiProyectoService } from '../../servicio/api-proyecto.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.page.html',
  styleUrls: ['./detalle-producto.page.scss'],
})
export class DetalleProductoPage implements OnInit {

  public idActiva: number = 0;
  public productoActivo!: ProductoID;
  public usuarioActivo = this.apiProducto.retornarId();
  public formulario: FormGroup

  constructor(
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private apiProducto: ApiProyectoService,
    private http: HttpClient,
    private formB: FormBuilder

  ) { }

  ngOnInit() {
    this.rutaActiva.paramMap.subscribe(parametros => {
      this.idActiva = +parametros.get('idProducto')
      this.apiProducto.obtenerProductoPorID(this.idActiva)
        .subscribe(datos => {
          if (datos) {
            this.productoActivo = datos;
          } else {
            this.router.navigate(['']);
          }
        })
    });

  }

  public id = this.apiProducto.retornarId();
  public cantidad2: number = 0;

  hayProductoCarro(nomP:string) {

    this.http.get<any>(this.apiProducto.urlCarrito).subscribe(data => {
      const producto = data.find((a: any) => {
        return a.idUsuario == this.id &&
          a.idProducto == this.idActiva
          
      });
      if (producto) {
        this.cantidad2 = producto.cantidad + 1
        const carrito: Carrito = {
          "idProducto": producto.idProducto,
          "nombreProducto" :nomP,
          "cantidad": producto.cantidad + 1,
          "total": this.productoActivo.precio * this.cantidad2,
          "idUsuario": producto.idUsuario
        }
        
        this.apiProducto.ModificarCarro(producto.id, carrito).subscribe(datos => {
          alert("Producto agregado")
          this.router.navigate(['principal']);
        })
      }
      else {
        const carrito: Carrito = {
          "idProducto": this.idActiva,
          "nombreProducto" : nomP,
          "cantidad": 1,
          "total": this.productoActivo.precio,
          "idUsuario": parseInt(this.apiProducto.retornarId())
        }

        this.apiProducto.agregarCarrito({
          ...carrito
        }).subscribe(datos => {
          alert("Producto agregado")
          this.router.navigate(['principal']);
        })
      }


    })

  }





}
