import { HttpClient } from '@angular/common/http'; // Importación del cliente HTTP de Angular
import { Injectable } from '@angular/core'; // Importación del decorador Injectable
import { Observable } from 'rxjs'; // Importación de la clase Observable para manejar respuestas asíncronas
import { API_URL } from '../config/api';

// Interfaz que define la estructura de un objeto Apoderado
export interface Apoderado {
  id_apoderado: number; // Identificador único del apoderado
  dni: string; // Documento Nacional de Identidad del apoderado
  nombre: string; // Nombre del apoderado
  apellido: string; // Apellido del apoderado
  email: string; // Correo electrónico del apoderado
  celular: string; // Número de celular del apoderado
  direccion: string; // Dirección del apoderado
}

@Injectable({
  providedIn: 'root' // Indica que este servicio se proporciona a nivel de raíz
})
export class ApoderadosService {
  private apiUrl = `${API_URL}/apoderados`; // URL base para la API de apoderados (modificar según sea necesario)

  constructor(private http: HttpClient) {} // Inyección del cliente HTTP en el constructor

  // Método para agregar un nuevo apoderado
  addApoderado(apoderado: Apoderado): Observable<Apoderado> {
    return this.http.post<Apoderado>(this.apiUrl, apoderado); // Realiza una solicitud POST para agregar el apoderado
  }
}
