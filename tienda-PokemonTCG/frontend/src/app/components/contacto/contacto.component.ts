import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necesario para enlazar datos [(ngModel)]
import { ProductoService } from '../../services/producto.service'; // Usaremos el servicio existente

@Component({
  selector: 'app-contacto',
  standalone: true,
  // Importamos los modulos necesarios para el formulario
  imports: [CommonModule, FormsModule], 
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  // Objeto que representa el mensaje del usuario, inicializado vacio
  nuevoMensaje = {
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: ''
  };

  // Mensajes de estado para el usuario
  enviado = false;
  errorEnvio = false;

  constructor(private productoService: ProductoService) {}

  // Funcion principal para enviar el formulario
  enviarMensaje() {
    // Reiniciamos estados
    this.enviado = false;
    this.errorEnvio = false;

    // Llamada al metodo del servicio para registrar el mensaje
    // Requerimiento 6.6 (POST)
    this.productoService.agregarMensaje(this.nuevoMensaje).subscribe({
      next: (res) => {
        // Si el backend responde con exito
        this.enviado = true;
        console.log('Mensaje enviado correctamente');
        // Limpiamos el formulario
        this.nuevoMensaje = { nombre: '', correo: '', asunto: '', mensaje: '' };
      },
      error: (err) => {
        // Si hay un error en la conexion o el servidor
        this.errorEnvio = true;
        console.error('Error al enviar el mensaje:', err);
      }
    });
  }
}