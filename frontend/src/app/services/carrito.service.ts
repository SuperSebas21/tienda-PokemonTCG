import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  // Arreglo para almacenar las cartas seleccionadas
  private items: any[] = [];

  constructor() { }

  // Añade un producto o incrementa su cantidad si ya existe
  agregarAlCarrito(producto: any) {
    const itemExistente = this.items.find(item => item.id === producto.id);
    if (itemExistente) {
      itemExistente.cantidad += 1;
    } else {
      // Agregamos la propiedad 'cantidad' al objeto
      this.items.push({ ...producto, cantidad: 1 });
    }
  }

  obtenerCarrito() {
    return this.items;
  }

  eliminarItem(id: number) {
    this.items = this.items.filter(item => item.id !== id);
  }

  vaciarCarrito() {
    this.items = [];
    return this.items;
  }

  // Calcula el total a pagar iterando sobre los items
  calcularTotal(): number {
    return this.items.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  }
}