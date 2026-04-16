import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Obligatorio para usar *ngFor y | currency
import { RouterLink } from '@angular/router'; // Obligatorio para navegar al detalle de la carta
import { ProductoService } from '../../services/producto.service';
import { CarritoService } from '../../services/carrito.service';
import { ProductoCardComponent } from '../producto-card/producto-card.component';



@Component({
  selector: 'app-catalogo',
  standalone: true,
  // Aqui inyectamos los modulos que el HTML necesita para funcionar
  imports: [CommonModule, RouterLink, ProductoCardComponent], 
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit {
  // Arreglo para guardar los datos de MySQL
  cartas: any[] = [];

  constructor(private productoService: ProductoService, private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.obtenerCartas();
  }

  obtenerCartas(): void {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.cartas = data;
      },
      error: (err) => {
        console.error('Error al recuperar las cartas:', err);
      }
    });
  }

  agregarAlCarrito(carta: any) {
    this.carritoService.agregarAlCarrito(carta);
    alert(`${carta.nombre} fue agregada al carrito.`);
  }

}