import { HttpClient } from '@angular/common/http'; // Importación del cliente HTTP de Angular
import { Injectable } from '@angular/core'; // Importación del decorador Injectable
import { Observable } from 'rxjs'; // Importación de la clase Observable para manejar respuestas asíncronas

// Interfaz que define la estructura de un objeto Curso
export interface Curso {
  id_curso: number; // Identificador único del curso
  nombre_curso: string; // Nombre del curso
  id_profesor: number; // Identificador del profesor que imparte el curso
  nombre: string; // Nombre del profesor
  apellido: string; // Apellido del profesor
}

@Injectable({
  providedIn: 'root' // Indica que este servicio se proporciona a nivel de raíz
})
export class CursosService {
  private apiUrl = 'http://localhost:3000/api/cursos'; // URL base para la API de cursos

  constructor(private http: HttpClient) { } // Inyección del cliente HTTP en el constructor

  // Método para obtener todos los cursos
  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl); // Realiza una solicitud GET para obtener la lista de cursos
  }

  // Método para obtener cursos por ID de profesor
  getCursosByProfesor(id_profesor: number): Observable<Curso[]> {
    const url = `${this.apiUrl}?id_profesor=${id_profesor}`; // Construye la URL con el parámetro id_profesor
    return this.http.get<Curso[]>(url); // Realiza una solicitud GET para obtener los cursos del profesor específico
  }
}
