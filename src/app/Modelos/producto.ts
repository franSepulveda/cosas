export interface Producto {
    imagen: string;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    categoria: string;
    unidades_pack : string;
    peso: string;
    marca: string;
    tipo_envase : string;

  }
  
  export interface ProductoID extends Producto {
    id: number;
  }
  
  export interface ProductoParcial extends Partial<Producto>{}
  