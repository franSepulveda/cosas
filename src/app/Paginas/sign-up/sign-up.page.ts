import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiProyectoService } from '../../servicio/api-proyecto.service';
import { HttpClient } from '@angular/common/http';
// import {} from '../../';
// modelo


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  public formularioRegistro: FormGroup;


  constructor(private formB: FormBuilder,
    private http: HttpClient,
    private api: ApiProyectoService,
    private router: Router) {
    this.formularioRegistro = this.formB.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      contraseña: ['', [Validators.required, Validators.minLength(5)]],
    })
  }

  ngOnInit() {
  }

  public campo(control: string) {
    return this.formularioRegistro.get(control);
  }

  async Registrarse() {
    if (this.formularioRegistro.invalid) {
      return;
    }
    else {
      this.http.get<any>(this.api.urlUsuarios).subscribe(data => {
        const user = data.find((a: any) => {
          return a.nombre.toLowerCase() == this.formularioRegistro.value.nombre.toLowerCase()
          
        });
        if(user){
          alert("El usuario ya existe")
          return;
        }
        else{
          this.api.agregarUsuario({
            ...this.formularioRegistro.value
            
          }).subscribe(datos => {
            this.formularioRegistro.reset();
            this.router.navigate(['']);
          })


        }
      })
    }
  }

}



