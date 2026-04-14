import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent implements OnInit {
  // Variable para almacenar la informacion de la carta seleccionada
  producto: any;

  // Inyectamos ActivatedRoute para leer parametros de la URL y el servicio de productos
  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    // Obtenemos el ID desde la ruta dinamica configurada en app.routes.ts
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    // Llamada al servicio para obtener solo los datos de este producto especifico
    this.productoService.getProductoById(id).subscribe({
      next: (data) => {
        this.producto = data;
      },
      error: (err) => {
        console.error('Error al cargar el detalle del producto', err);
      }
    });
  }
}