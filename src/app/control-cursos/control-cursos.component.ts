import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BarraNavComponent } from "../barraNav/barraNav.component";
import { Curso } from '../services/cursos.service';
import { CursosService } from './../services/cursos.service';

@Component({
  selector: 'app-control-cursos',
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule, BarraNavComponent],
  templateUrl: './control-cursos.component.html',
  styleUrl: './control-cursos.component.css'
})
export class ControlCursosComponent {
  cursos: Curso[] = [];
  allCurso: Curso[] = [];
  errorMessage: string | null = null;

  constructor (private cursosService:CursosService){}

  ngOnInit(): void {
    this.loadCursos();

  }

  // Cargar a todos los estudiantes desde la base de datos
  loadCursos(): void {
    this.cursosService.getCursos().subscribe(data => {
      this.cursos = data;
      this.allCurso = [...data]; // Guarda todos los profesores
    }, error => {
      console.error('Error al cargar profesores:', error);
      this.errorMessage = 'No se pudieron cargar los profesores. Inténtalo de nuevo más tarde.'; // Manejo de errores
    });
  }
}
