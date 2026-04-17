import { Component } from '@angular/core';
// Debemos importar AMBOS: RouterOutlet y RouterLink
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  // Agregamos RouterLink al arreglo de imports
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pokemon-tcg-app';
}