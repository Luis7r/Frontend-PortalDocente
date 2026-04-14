import { CommonModule, NgFor } from '@angular/common'; // Importar módulos comunes
import { Component, OnInit } from '@angular/core'; // Importar decorador de componente y ciclo de vida
import { FormsModule } from '@angular/forms'; // Importar módulo de formularios
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component'; // Importar componente de cabecera
import { Curso, CursosService } from '../services/cursos.service'; // Importar modelo y servicio de cursos
import { DetalleCurso, DetallecursoService } from '../services/detallecurso.service'; // Importar modelo y servicio de detalle de curso
import { LoginService } from './../services/login.service';
declare var window: any; // Declarar variable global para uso en ventana
declare var bootstrap: any;

@Component({
  selector: 'app-cursos', // Selector del componente
  standalone: true, // Componente independiente
  imports: [HeaderComponent, NgFor, CommonModule, FormsModule, RouterLink], // Importar módulos y componentes necesarios
  templateUrl: './cursos.component.html', // Ruta a la plantilla HTML
  styleUrls: ['./cursos.component.css'], // Ruta a los estilos CSS
})
export class CursosComponent implements OnInit { // Definición de la clase del componente

  cursos: Curso[] = []; // Almacenar cursos
  user: any; // Almacenar datos del usuario
  estudiantes: DetalleCurso[] = []; // Almacenar detalles de estudiantes
  selectedCursoId: number | null = null; // ID del curso seleccionado
  successMessage: string = '';
  fechaActual: string = '';
  isFormValid: boolean = true;


  constructor(
    private cursosService: CursosService,
    private loginService: LoginService,
    private detalleCursoService: DetallecursoService,
  ) {}



  // Método del ciclo de vida que se ejecuta al inicializar el componente
  ngOnInit(): void {

    this.user = this.loginService.getUser();
    if (!this.user || !this.user.id_profesor) {
      console.error('Usuario no autenticado.');
      return;
    }

    this.cursosService.getCursosByProfesor(this.user.id_profesor).subscribe({
      next: (cursos) => {
        this.cursos = cursos;
      },
      error: (err) => {
        console.error('Error al obtener los cursos', err);
      }
    });
  }


   // Método para validar las notas
   validateNota(nota: number | null): boolean {
    return nota !== null && nota !== undefined && !isNaN(nota) && nota >= 0 && nota <= 20;
  }

  // Método para obtener estudiantes por curso
  getEstudiantesByCurso(cursoId: number) {
    this.detalleCursoService.getDetalleCurso().subscribe({
      next: (estudiantes) => {
        this.estudiantes = estudiantes ? estudiantes.filter(est => est.id_curso === cursoId) : [];
        this.selectedCursoId = cursoId;
      },
      error: (err) => {
        console.error('Error al obtener los estudiantes', err);
        this.estudiantes = [];
      }
    });
  }

   // Método para calcular la nota final automáticamente
   calculateNotasFinales() {
    this.isFormValid = true;  // Reiniciar validación
    this.estudiantes.forEach(est => {
      if (
        !this.validateNota(est.nota1) ||
        !this.validateNota(est.nota2) ||
        !this.validateNota(est.nota3) ||
        !this.validateNota(est.nota4)
      ) {
        this.isFormValid = false;  //Desabilitar botón
      }
      est.notafinal = this.calculateNotaFinal(est);
    });
  }

  calculateNotaFinal(est: DetalleCurso): number {
    const { nota1, nota2, nota3, nota4 } = est;
    return (Number(nota1) + Number(nota2) + Number(nota3) + Number(nota4)) / 4 || 0;
  }


  // Método para guardar las notas de los estudiantes
  guardarNotas() {
    let completedRequests = 0;
    this.estudiantes.forEach(estudiante => {
      estudiante.notafinal = this.calculateNotaFinal(estudiante);
      this.detalleCursoService.actualizarNotas(estudiante).subscribe({
        next: () => {
          completedRequests++;
          // Si todas las notas se han guardado correctamente
          if (completedRequests === this.estudiantes.length) {
            this.successMessage = 'Notas actualizadas correctamente.';
            console.log('Notas actualizadas correctamente.');
            this.showSuccessModal();
          }
        },
        error: (err) => {
          console.error('Error al actualizar notas', err);
          alert(`Error al actualizar notas para el estudiante ID: ${estudiante.id_detallecurso}`);
        }
      });
    });
  }


  showSuccessModal() {
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();
  }


}
