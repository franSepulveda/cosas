import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ProductoID } from '../../Modelos/producto';
import { ApiProyectoService } from '../../servicio/api-proyecto.service';

@Component({
  selector: 'app-eliminar-admin',
  templateUrl: './eliminar-admin.page.html',
  styleUrls: ['./eliminar-admin.page.scss'],
})
export class EliminarAdminPage implements OnInit {
  public carritosEliminados = 0;
  public idActiva: number = 0;
  public productoActivo!: ProductoID;
  
  constructor(
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private apiProducto: ApiProyectoService,
    private alerta: AlertController,
    private http: HttpClient
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

  public async eliminarProducto() {
    const mensaje = await this.alerta.create({
      header: '¿Seguro quieres borrar?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Si',
          role: 'confirm',
          handler: () => {
            this.apiProducto.eliminarProductoPorID(this.idActiva)
              .subscribe(() => {
                this.http.get<any>(`${this.apiProducto.urlCarrito}?idProducto=${this.idActiva}`).subscribe(datos => {
                  const carritos = datos.find((a: any) => {
                    this.carritosEliminados += 1;
                    this.apiProducto.eliminarCarrito(a.id).subscribe(data => {
                    })
                    alert("se han eliminado " + this.carritosEliminados + " carritos ")
                  })
                })
                this.router.navigate(['listarAdmin']);
              })
          }
        }
      ]
    });
    await mensaje.present();
  }

}
