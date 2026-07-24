import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { API_URL } from '../config/api';
export interface Estudiante {
    id_estudiante: number;
    dni: string;
    nombre: string;
    apellido: string;
    grados: string;
    nombreA: string;
    apellidoA: string;
    email:string,
    celular:number,
    direccion: string;
}



@Injectable({
    providedIn: 'root'
})
export class EstudiantesService {
    private apiUrl = `${API_URL}/estudiantes`;

    constructor(private http: HttpClient,
      private loginService: LoginService) {}

    getEstudiantes(): Observable<Estudiante[]> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
        return this.http.get<Estudiante[]>(this.apiUrl);
    }




}
