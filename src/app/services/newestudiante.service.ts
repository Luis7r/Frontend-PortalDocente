import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../config/api';

// Interfaz que define la estructura de un nuevo estudiante
export interface NewEstudiante {
  id_estudiante: number;
  dni: string;
  nombre: string;
  apellido: string;
  id_grado: number | null;
  id_apoderado: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class NewestudianteService {
  private apiUrl = `${API_URL}/newestudiantes`; // URL de la API

  constructor(private http: HttpClient) { }

  // Método para agregar un nuevo estudiante
  addNewEstudiante(newestudiante: NewEstudiante): Observable<NewEstudiante> {
    return this.http.post<NewEstudiante>(this.apiUrl, newestudiante); // Realiza la solicitud POST
  }
}
