import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Carrito } from 'src/app/Modelos/carrito';
import { ApiProyectoService } from '../../servicio/api-proyecto.service';


@Component({
  selector: 'app-modificar-admin',
  templateUrl: './modificar-admin.page.html',
  styleUrls: ['./modificar-admin.page.scss'],
})
export class ModificarAdminPage implements OnInit {

  public imagenCargando = false;
  public imagenBase64 = '';
  public formulario: FormGroup;
  public idActiva = 0;
  public cambCar =0;


  constructor(
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private apiProducto: ApiProyectoService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      imagen: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      precio: [0, [Validators.required, Validators.min(1)]],
      stock: [0, [Validators.required, Validators.min(1)]],
      categoria: ['', [Validators.required, Validators.minLength(2)]],
      unidades_pack: ['', [Validators.required, Validators.minLength(1)]],
      peso: ['', [Validators.required, Validators.minLength(1)]],
      marca: ['', [Validators.required, Validators.minLength(2)]],
      tipo_envase: ['', [Validators.required, Validators.minLength(3)]],
    })
  }
  public campo(control: string) {
    return this.formulario.get(control);
  }
  public fueTocado(control: string) {
    return this.formulario.get(control).touched;
  }
  public estaSucio(control: string) {
    return this.formulario.get(control).dirty;
  }
  public cargarFoto(e: Event) {
    this.imagenCargando = true;
    const elemento = e.target as HTMLInputElement;
    const archivo = elemento.files[0];
    console.log(archivo);
    const reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onload = () => {
      this.imagenCargando = false;

      this.imagenBase64 = reader.result as string;
    }
  }
  ngOnInit() {
    this.rutaActiva.params.subscribe(parametros => {
      this.idActiva = parametros.idProducto;
      this.apiProducto.obtenerProductoPorID(this.idActiva)
        .subscribe(producto => {
          if (producto) {
            this.imagenBase64 = producto.imagen;
            this.formulario.setValue({
              ...producto
            });

            this.formulario.updateValueAndValidity();
          }
          else {
            this.router.navigate(['']);
          }
        })
    })
  }

  

  public modificarProducto() {
    if (this.formulario.invalid || this.imagenCargando) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.apiProducto.modificarPorID(this.idActiva, {
      ...this.formulario.value,
      imagen: this.imagenBase64
    }).subscribe(datos => {
      if (datos) {
        alert('Modificado')
        this.http.get<any>(`${this.apiProducto.urlCarrito}?idProducto=${this.idActiva}`).subscribe(datos=>{
          const carritos = datos.find((a:any)=>{
             const nuevoCarro :Carrito = {
              "idProducto" : a.idProducto,
              "idUsuario": a.idUsuario,
              "cantidad":a.cantidad,
              "total": this.formulario.value.precio * a.cantidad,
              "nombreProducto":this.formulario.value.nombre
             
             }
            this.apiProducto.ModificarCarro(a.id,nuevoCarro).subscribe();
          })
          
        })
        this.router.navigate(['listarAdmin']);
      }
    })
  }

}
