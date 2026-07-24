import { HttpClient } from '@angular/common/http'; // Importación del cliente HTTP de Angular
import { Injectable } from '@angular/core'; // Importación del decorador Injectable
import { Observable } from 'rxjs'; // Importación de la clase Observable para manejar respuestas asíncronas

// Interfaz que define la estructura de un objeto Docente
export interface Docente {
  id_profesor: number;
  dni: string;
  nombre: string;
  apellido: string;
  profesion: string;
  num_cursos: string;
  celular: string;
  codigo_docente: string;
  usuario: string;
  contrasena: string;
}

@Injectable({
  providedIn: 'root'
})
export class DocentesService {
  private apiUrl = 'http://localhost:3000/api/docentes'; // URL base para la API de docentes

  constructor(private http: HttpClient) { }

  // Método para obtener todos los docentes
  getDocentes(): Observable<Docente[]> {
      return this.http.get<Docente[]>(this.apiUrl);
  }

  // Método para agregar un nuevo docente
  addDocente(docente: Docente): Observable<Docente> {
    return this.http.post<Docente>(this.apiUrl, docente);
  }

  // Método para eliminar un docente por su DNI
  deleteDocente(dni: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${dni}`);
  }
}
