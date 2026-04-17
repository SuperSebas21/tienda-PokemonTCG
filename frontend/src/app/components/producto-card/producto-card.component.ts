import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-producto-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './producto-card.component.html',
  styleUrl: './producto-card.component.css'
})
export class ProductoCardComponent {
  // Recibe la información del catálogo padre
  @Input() item: any; 

  // Envía un aviso al catálogo padre cuando le dan clic al botón
  @Output() agregar = new EventEmitter<any>();

  alAgregarAlCarrito() {
    this.agregar.emit(this.item);
  }
}