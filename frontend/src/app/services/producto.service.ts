import { Injectable } from '@angular/core';
// Importamos HttpClient y Observable, requerimientos obligatorios
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  // URL de producción en Render (ya no es localhost)
  private apiUrl = 'https://pokemon-tcg-api-m1lc.onrender.com/productos';
  
  // URL de contacto en producción
  private contactoUrl = 'https://pokemon-tcg-api-m1lc.onrender.com/contacto';

  // Inyectamos HttpClient en el constructor
  constructor(private http: HttpClient) { }

  // Metodo GET: Obtiene la lista completa de cartas
  getProductos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Metodo GET: Obtiene el detalle de una carta especifica por ID
  getProductoById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Metodo POST: Agrega una nueva carta a la base de datos
  agregarProducto(producto: any): Observable<any> {
    return this.http.post(this.apiUrl, producto);
  }

  // Metodo POST: Envia el formulario de contacto al backend
  agregarMensaje(mensaje: any): Observable<any> {
    return this.http.post(this.contactoUrl, mensaje);
  }
}