import { HttpClient } from '@angular/common/http'; // Importación del cliente HTTP de Angular
import { Injectable } from '@angular/core'; // Importación del decorador Injectable
import { Observable } from 'rxjs'; // Importación de la clase Observable para manejar respuestas asíncronas

// Interfaz que define la estructura de un objeto DetalleCurso
export interface DetalleCurso {
  id_detallecurso: number; // Identificador único del detalle del curso
  id_estudiante: number; // Identificador del estudiante
  nombre: string; // Nombre del estudiante
  id_curso: number; // Identificador del curso
  nota1: number; // Nota del primer parcial
  nota2: number; // Nota del segundo parcial
  nota3: number; // Nota del tercer parcial
  nota4: number; // Nota del cuarto parcial
  notafinal: number; // Nota final del curso
}

@Injectable({
  providedIn: 'root' // Indica que este servicio se proporciona a nivel de raíz
})
export class DetallecursoService {
  private apiUrl = 'http://localhost:3000/api/detallecurso'; // URL base para la API de detalle de cursos

  constructor(private http: HttpClient) {} // Inyección del cliente HTTP en el constructor

  // Método para obtener todos los detalles del curso
  getDetalleCurso(): Observable<DetalleCurso[]> {
    return this.http.get<DetalleCurso[]>(this.apiUrl); // Realiza una solicitud GET para obtener la lista de detalles de cursos
  }

  // Método para actualizar las notas de un detalle de curso
  actualizarNotas(detalleCurso: DetalleCurso): Observable<any> {
    return this.http.put(`${this.apiUrl}/${detalleCurso.id_detallecurso}`, detalleCurso); // Realiza una solicitud PUT para actualizar las notas
  }
}
