import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Vacante {
  vacantes: number; // Número de vacantes para un grado
}

export type Vacantes = Vacante[]; // Array de objetos Vacante (vacantes por grado)

@Injectable({
  providedIn: 'root'
})
export class VacantesService {
  private apiUrl = 'http://localhost:3000/api/vacante';

  constructor(private http: HttpClient) { }

  getVacantes(idGrado: number): Observable<Vacantes> {
    return this.http.get<Vacantes>(`${this.apiUrl}?id_grado=${idGrado}`);
  }
}
