import { HttpClient, HttpHeaders } from '@angular/common/http'; // Añadimos HttpHeaders
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Horario {
  id_profesor: number;
  Dia: string;
  ID_Curso: number;
  HoraInicio: string;
  HoraFin: string;
}

@Injectable({
  providedIn: 'root'
})
export class HorariosService {

  private apiUrl = 'http://localhost:3000/api/horarios'; // Asegúrate de que esta URL sea correcta

  constructor(private http: HttpClient) { }

  // Método privado para generar los headers con el token automáticamente
  private createHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // Buscamos 'authToken' en el localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Método para obtener todos los horarios
  getHorarios(): Observable<Horario[]> {
    // Se agrega el token en las cabeceras como segundo parámetro
    return this.http.get<Horario[]>(this.apiUrl, { headers: this.createHeaders() }); 
  }

  // Método para obtener los horarios de un profesor específico
  getHorariosByProfesor(id_profesor: number): Observable<Horario[]> {
    const url = `${this.apiUrl}?id_profesor=${id_profesor}`; 
    // Se agrega el token en las cabeceras como segundo parámetro
    return this.http.get<Horario[]>(url, { headers: this.createHeaders() }); 
  }

}