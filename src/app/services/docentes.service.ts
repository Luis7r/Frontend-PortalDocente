import { HttpClient } from '@angular/common/http'; // Importación del cliente HTTP de Angular
import { Injectable } from '@angular/core'; // Importación del decorador Injectable
import { Observable } from 'rxjs'; // Importación de la clase Observable para manejar respuestas asíncronas

// Interfaz que define la estructura de un objeto Docente
export interface Docente {
  id_profesor: number; // Identificador único del profesor
  dni: string; // Documento Nacional de Identidad del profesor
  nombre: string; // Nombre del profesor
  apellido: string; // Apellido del profesor
  profesion: string; // Profesión del profesor
  num_cursos: string; // Número de cursos que imparte
  celular: string; // Número de celular del profesor
  codigo_docente: string; // Código único del docente
  usuario: string; // Nombre de usuario para el acceso
  contrasena: string; // Contraseña para el acceso
}

@Injectable({
  providedIn: 'root' // Indica que este servicio se proporciona a nivel de raíz
})
export class DocentesService {
  private apiUrl = 'http://localhost:3000/api/docentes'; // URL base para la API de docentes

  constructor(private http: HttpClient) { } // Inyección del cliente HTTP en el constructor

  // Método para obtener todos los docentes
  getDocentes(): Observable<Docente[]> {
      return this.http.get<Docente[]>(this.apiUrl); // Realiza una solicitud GET para obtener la lista de docentes
  }

  // Método para agregar un nuevo docente
  addDocente(docente: Docente): Observable<Docente> {
    return this.http.post<Docente>(this.apiUrl, docente); // Realiza una solicitud POST para agregar un nuevo docente
  }

  // Método para eliminar un docente por su DNI
  deleteDocente(dni: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${dni}`); // Realiza una solicitud DELETE para eliminar un docente
  }
}
