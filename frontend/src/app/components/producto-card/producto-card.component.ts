// Importamos Input y Output
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
  // Recibe la info de la carta desde el catalogo (Punto 6.3)
  @Input() carta: any; 
  
  // Envia una señal al catalogo cuando se hace clic en agregar (Punto 6.3 Extra)
  @Output() agregar = new EventEmitter<any>();

  onAgregarClick() {
    this.agregar.emit(this.carta);
  }
}