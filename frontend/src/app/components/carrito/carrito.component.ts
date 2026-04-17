import { Component, inject } from '@angular/core'; // 1. Importamos inject
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  // 2. Usamos inject() en lugar del constructor. ¡Esto soluciona el error!
  private carritoService = inject(CarritoService);

  // 3. Ahora sí podemos conectar las Signals sin problemas
  itemsCarrito = this.carritoService.carrito;
  total = this.carritoService.total;

  eliminarCarta(id: number) {
    this.carritoService.eliminarItem(id);
  }

  procesarCompra() {
    if (this.itemsCarrito().length > 0) {
      alert('¡Compra realizada con éxito! Preparando tus cartas para el envío.');
      this.carritoService.vaciarCarrito();
    }
  }
}