import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Horario{
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

  constructor(private http: HttpClient

  ) { }


  getHorarios(): Observable<Horario[]> {
    return this.http.get<Horario[]>(this.apiUrl); // Realiza una solicitud GET para obtener los horarios
  }

  getHorariosByProfesor(id_profesor: number): Observable<Horario[]> {
    const url = `${this.apiUrl}?id_profesor=${id_profesor}`; // Construye la URL con el parámetro id_profesor
    return this.http.get<Horario[]>(url); // Realiza una solicitud GET para obtener los horarios del profesor específico
  }


}
