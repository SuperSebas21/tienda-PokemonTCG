import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Obligatorio para usar *ngFor y | currency
import { RouterLink } from '@angular/router'; // Obligatorio para navegar al detalle de la carta
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-catalogo',
  // Aqui inyectamos los modulos que el HTML necesita para funcionar
  imports: [CommonModule, RouterLink], 
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit {
  // Arreglo para guardar los datos de MySQL
  cartas: any[] = [];

  constructor(private productoService: ProductoService) {}

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
}