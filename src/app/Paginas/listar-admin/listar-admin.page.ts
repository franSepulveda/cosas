import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoID } from '../../Modelos/producto';
import { ApiProyectoService } from '../../servicio/api-proyecto.service';
import { IonInfiniteScroll } from '@ionic/angular';


@Component({
  selector: 'app-listar-admin',
  templateUrl: './listar-admin.page.html',
  styleUrls: ['./listar-admin.page.scss'],
})
export class ListarAdminPage implements OnInit {




  @ViewChild(IonInfiniteScroll)
  public scroll: IonInfiniteScroll;
  public productos: Array<ProductoID> = [];
  constructor(
    private apiProducto: ApiProyectoService,
    private router: Router
  ) { }

  ngOnInit() {

  }
  ionViewWillEnter(){
    this.apiProducto.listarPrimerosElementos()
    this.apiProducto.listaProductos$.subscribe(datosActualizados => {
      this.productos = datosActualizados;
      if(this.scroll){
        this.scroll.complete();
      }
    })
  }
  public cargarMasDatos(){
    this.apiProducto.obtenerMasElementos();
  }
}

