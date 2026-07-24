import { HttpClient, HttpHeaders } from '@angular/common/http'; // Añadimos HttpHeaders
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs'; 

// Interfaz que define la estructura de un objeto DetalleCurso
export interface DetalleCurso {
  id_detallecurso: number; 
  id_estudiante: number; 
  nombre: string; 
  id_curso: number; 
  nota1: number; 
  nota2: number; 
  nota3: number; 
  nota4: number; 
  notafinal: number; 
}

@Injectable({
  providedIn: 'root' 
})
export class DetallecursoService {
  private apiUrl = 'http://localhost:3000/api/detallecurso'; 

  constructor(private http: HttpClient) {} 

  // Método privado para generar los headers con el token automáticamente
  private createHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // Ojo: Usamos 'authToken'
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Método para obtener todos los detalles del curso
  getDetalleCurso(): Observable<DetalleCurso[]> {
    // Se agrega como segundo parámetro en el GET
    return this.http.get<DetalleCurso[]>(this.apiUrl, { headers: this.createHeaders() }); 
  }

  // Método para actualizar las notas de un detalle de curso
  actualizarNotas(detalleCurso: DetalleCurso): Observable<any> {
    // Se agrega como TERCER parámetro en el PUT
    return this.http.put(
      `${this.apiUrl}/${detalleCurso.id_detallecurso}`, 
      detalleCurso, 
      { headers: this.createHeaders() } 
    ); 
  }
}