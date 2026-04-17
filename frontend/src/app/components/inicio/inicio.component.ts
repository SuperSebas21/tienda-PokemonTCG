import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // 1. Importamos la herramienta de navegación

@Component({
  selector: 'app-inicio',
  standalone: true, // Aseguramos que sea standalone
  imports: [RouterLink], // 2. La agregamos a los imports del componente
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  // Aquí puedes agregar lógica más tarde, por ahora se queda limpio.
}