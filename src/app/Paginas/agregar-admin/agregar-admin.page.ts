import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiProyectoService } from '../../servicio/api-proyecto.service';


@Component({
  selector: 'app-agregar-admin',
  templateUrl: './agregar-admin.page.html',
  styleUrls: ['./agregar-admin.page.scss'],
})
export class AgregarAdminPage implements OnInit {

  public imagenCargando = false;
  public imagenBase64 = '';
  public formulario: FormGroup;
  constructor(
    private formB: FormBuilder,
    private apiProducto: ApiProyectoService,
    private router: Router
  ) {
    this.formulario = this.formB.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      imagen: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      precio: [0, [Validators.required, Validators.min(1)]],
      stock: [0, [Validators.required, Validators.min(1)]],
      categoria: ['', [Validators.required, Validators.minLength(2)]],
      unidades_pack : ['', [Validators.required, Validators.minLength(1)]],
      peso: ['', [Validators.required, Validators.minLength(2)]],
      marca: ['', [Validators.required, Validators.minLength(2)]],
      tipo_envase : ['', [Validators.required, Validators.minLength(3)]],
    })
  }
  public campo(control: string) {
    return this.formulario.get(control);
  }
  public fueTocado(control: string){
    return this.formulario.get(control).touched;
  }
  public estaSucio(control: string){
    return this.formulario.get(control).dirty;
  }
  public cargarFoto(e: Event){
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
  }
  public guardarImagen(): void {
    if(this.formulario.invalid || this.imagenCargando){
      this.formulario.markAllAsTouched();
      return;
    }
    this.apiProducto.agregarProducto({
      ...this.formulario.value,
      imagen: this.imagenBase64
    })
    .subscribe(resultado => {
      if(resultado){
        this.formulario.reset();
        this.formulario.updateValueAndValidity();
        
        this.router.navigate(['listarAdmin']);
      }
    })
  }

}
