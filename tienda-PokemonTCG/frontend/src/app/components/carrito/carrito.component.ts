import { Component, OnInit } from '@angular/core';
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
export class CarritoComponent implements OnInit {
  itemsCarrito: any[] = [];
  total: number = 0;

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.actualizarCarrito();
  }

  actualizarCarrito() {
    this.itemsCarrito = this.carritoService.obtenerCarrito();
    this.total = this.carritoService.calcularTotal();
  }

  eliminarCarta(id: number) {
    this.carritoService.eliminarItem(id);
    this.actualizarCarrito();
  }

  procesarCompra() {
    if (this.itemsCarrito.length > 0) {
      alert('¡Compra realizada con éxito! Preparando tus cartas para el envío.');
      this.carritoService.vaciarCarrito();
      this.actualizarCarrito();
    }
  }
}