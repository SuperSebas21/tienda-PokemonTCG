import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  // 1. Reemplazamos el arreglo normal por una Signal (Punto 6.8 de la rúbrica)
  private itemsSignal = signal<any[]>([]);

  constructor() { }

  // Exponemos el carrito como "Solo Lectura" por seguridad
  get carrito() {
    return this.itemsSignal.asReadonly();
  }

  // 2. Usamos 'computed' para que el total se recalcule automáticamente
  // cada vez que la signal principal (itemsSignal) cambie.
  total = computed(() => {
    return this.itemsSignal().reduce((suma, item) => suma + (item.precio * item.cantidad), 0);
  });

  // Añade un producto o incrementa su cantidad de forma inmutable
  agregarAlCarrito(producto: any) {
    this.itemsSignal.update(items => {
      const itemExistente = items.find(item => item.id === producto.id);
      
      if (itemExistente) {
        // Mapeamos el arreglo para actualizar solo la cantidad del item correcto
        return items.map(item => 
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      } else {
        // Si no existe, lo agregamos al final con cantidad 1
        return [...items, { ...producto, cantidad: 1 }];
      }
    });
  }

  eliminarItem(id: number) {
    // Filtramos el arreglo para quitar el producto
    this.itemsSignal.update(items => items.filter(item => item.id !== id));
  }

  vaciarCarrito() {
    // .set() reemplaza todo el valor de la signal por uno nuevo
    this.itemsSignal.set([]);
  }
}