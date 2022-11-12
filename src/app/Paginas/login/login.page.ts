import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiProyectoService } from '../../servicio/api-proyecto.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public formularioLogin: FormGroup;

  constructor(private formB: FormBuilder,
    private api: ApiProyectoService,
    private router: Router,
    private http:HttpClient) 
    {
    this.formularioLogin = this.formB.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      contraseña: ['', [Validators.required, Validators.minLength(5)]],
    })
  }

  
  ngOnInit() {
    
  }

  public campo(control: string) {
    return this.formularioLogin.get(control);
  }

  public logearse() {
    if (this.formularioLogin.invalid) {
      return;
    }
    else {
      this.http.get<any>(this.api.urlUsuarios).subscribe(data=>{
        const user = data.find((a:any)=>{          
          return a.nombre.toLowerCase() === this.formularioLogin.value.nombre.toLowerCase() &&
          a.contraseña === this.formularioLogin.value.contraseña 

        });
        if(user){
          this.formularioLogin.reset();

          if(user.nombre.toLowerCase() ==="admin"){
            this.router.navigate(['listarAdmin']);
          }
          else{
            this.api.nombreUsuario(user.nombre);
            this.api.idUSuario(user.id);
            this.router.navigate(['principal']);
          }
        }
        else{
          alert("Usuario incorrecto ó no existe")
          return;
        }
      })
    }

  }


}
