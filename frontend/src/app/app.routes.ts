import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { AltaProductoComponent } from './components/alta-producto/alta-producto.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { ContactoComponent } from './components/contacto/contacto.component';

// Definicion de rutas para cumplir con el alcance del proyecto
export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'catalogo', component: CatalogoComponent },
  // Ruta dinamica para el detalle del producto segun requerimiento 6.4
  { path: 'productos/:id', component: DetalleComponent }, 
  { path: 'alta-producto', component: AltaProductoComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: '**', redirectTo: '' }
];