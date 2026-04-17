import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-alta-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './alta-producto.component.html',
  styleUrl: './alta-producto.component.css'
})
export class AltaProductoComponent {
  formProducto: FormGroup;
  // Añadimos esta variable para que el HTML pueda mostrar la fecha de hoy
  today: Date = new Date(); 

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient, 
    private router: Router
  ) {
    this.formProducto = this.fb.group({
      nombre: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      precio: [null, [Validators.required, Validators.min(1)]],
      stock: [null, [Validators.required, Validators.min(0)]],
      imagen: ['', [Validators.required]],
      descripcion: ['', [Validators.required]]
    });
  }

  enviarDatos() {
    if (this.formProducto.valid) {
      this.http.post('http://localhost:3000/productos', this.formProducto.value)
        .subscribe({
          next: (res) => {
            alert('¡Carta Pokémon registrada exitosamente!');
            this.router.navigate(['/catalogo']);
          },
          error: (err) => {
            console.error('Error al conectar con el servidor', err);
            alert('Error: Asegúrate de que el servidor de Node esté corriendo.');
          }
        });
    }
  }
}