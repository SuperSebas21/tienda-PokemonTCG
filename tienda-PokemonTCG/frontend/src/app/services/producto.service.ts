import { Injectable } from '@angular/core';
// Importamos HttpClient y Observable, requerimientos obligatorios
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  // Definimos la URL de nuestro servidor Node.js para productos
  private apiUrl = 'http://localhost:3000/productos';
  
  // Definimos la nueva URL para los mensajes de contacto
  private contactoUrl = 'http://localhost:3000/contacto';

  // Inyectamos HttpClient en el constructor
  constructor(private http: HttpClient) { }

  // Metodo GET: Obtiene la lista completa de cartas
  // Retorna un Observable como pide el requerimiento 6.9
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
  // Cumple con el Requerimiento 6.9 y enlaza con el 5.2
  agregarMensaje(mensaje: any): Observable<any> {
    return this.http.post(this.contactoUrl, mensaje);
  }
}