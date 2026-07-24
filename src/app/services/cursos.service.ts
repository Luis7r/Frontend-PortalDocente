import { HttpClient, HttpHeaders } from '@angular/common/http'; // Añadimos HttpHeaders
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs'; 

export interface Curso {
  id_curso: number;
  nombre_curso: string;
  id_profesor: number;
  nombre: string;
  apellido: string;
}

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private apiUrl = 'http://localhost:3000/api/cursos'; 

  constructor(private http: HttpClient) { } 

  // Método privado para generar los headers con el token automáticamente
  private createHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // Recuperamos el token guardado en el login
    return new HttpHeaders({
      'Authorization': `Bearer ${token}` // Lo enviamos con el formato que espera el backend
    });
  }

  // Método para obtener todos los cursos (actualizado)
  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl, { headers: this.createHeaders() }); 
  }

  // Método para obtener cursos por ID de profesor (actualizado)
  getCursosByProfesor(id_profesor: number): Observable<Curso[]> {
    const url = `${this.apiUrl}?id_profesor=${id_profesor}`; 
    // Agregamos { headers: ... } a la petición
    return this.http.get<Curso[]>(url, { headers: this.createHeaders() }); 
  }
}