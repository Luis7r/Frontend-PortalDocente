import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  // Manejo del estado del usuario
  user: any;
  
  // Usamos signal para manejar el estado del sidebar de forma reactiva
  isSidebarOpen = signal(false);

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    // Obtenemos los datos del usuario al cargar el componente
    this.user = this.loginService.getUser();
  }

  // Función para abrir/cerrar el sidebar en móviles
  toggleSidebar() {
    this.isSidebarOpen.update(v => !v);
  }

  logout() {
    // Cerrar el modal programáticamente si usas Bootstrap (opcional, pero buena práctica)
    // Cierra sesión en el servicio
    this.loginService.logout(); 
    
    // Redirigir a la página de inicio de sesión
    this.router.navigate(['/login']); 
  }
}