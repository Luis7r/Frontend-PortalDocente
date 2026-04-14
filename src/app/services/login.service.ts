import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface User {
  nombre: string;
  apellido: string;
  usuario: string;
  celular: string;
  codigo_docente: string;
  profesion: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/api/login';
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUser(); // Cargar usuario desde localStorage al iniciar el servicio
  }

  // Autenticar al usuario
  login(usuario: string, contrasena: string): Observable<any> {
    const loginData = { usuario, contrasena };
    return this.http.post<any>(this.apiUrl, loginData).pipe(
      tap((response: { token: string; success: boolean; user: User }) => {
        if (response.success && response.user) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.userSubject.next(response.user);
        }
      })
    );
  }

  // Cerrar sesión, eliminar token y datos del usuario, y redirigir al login.
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    this.userSubject.next(null);
    window.location.href = '/login';
  }

  // Inicializar el estado del usuario desde localStorage cuando se carga la aplicación.
  loadUser() {
    const user = localStorage.getItem('user');
    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
  }

  // Verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    const user = localStorage.getItem('user');
    const token = this.getToken();
    return !!user && !!token && !this.isTokenExpired(token);  // Asegurarse de que el token no esté expirado
  }

  // Recuperar el token de autenticación del usuario.
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Recuperar los datos del usuario autenticado.
  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Método para verificar si el token ha expirado
  private isTokenExpired(token: string): boolean {
    const tokenPayload = this.decodeToken(token);
    if (tokenPayload && tokenPayload.exp) {
      const expirationDate = new Date(0);
      expirationDate.setUTCSeconds(tokenPayload.exp); // Convertir el tiempo de expiración en segundos
      return expirationDate < new Date();  // Si la fecha de expiración es menor que la fecha actual, el token ha expirado
    }
    return false;
  }

  // Método para decodificar el JWT
  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    } catch (e) {
      return null;
    }
  }
}
