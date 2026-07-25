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
  // Preferencias de accesibilidad
  theme: 'light' | 'dark' = 'light';
  fontPercent = 100; // porcentaje, p.ej. 100%

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    // Obtenemos los datos del usuario al cargar el componente
    this.user = this.loginService.getUser();
    // Cargar preferencias desde localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.theme = 'dark';
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    const savedFont = localStorage.getItem('fontPercent');
    if (savedFont) {
      const p = Number(savedFont);
      if (!isNaN(p)) {
        this.fontPercent = p;
        this.applyFontSize();
      }
    }
  }

  // Función para abrir/cerrar el sidebar en móviles
  toggleSidebar() {
    this.isSidebarOpen.update(v => !v);
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    if (this.theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', this.theme);
  }

  increaseFont() {
    if (this.fontPercent < 200) {
      this.fontPercent += 10;
      this.applyFontSize();
      localStorage.setItem('fontPercent', String(this.fontPercent));
    }
  }

  decreaseFont() {
    if (this.fontPercent > 70) {
      this.fontPercent -= 10;
      this.applyFontSize();
      localStorage.setItem('fontPercent', String(this.fontPercent));
    }
  }

  resetFont() {
    this.fontPercent = 100;
    this.applyFontSize();
    localStorage.setItem('fontPercent', String(this.fontPercent));
  }

  private applyFontSize() {
    const base = 16; // base en px
    const newSize = base * (this.fontPercent / 100);
    document.documentElement.style.setProperty('--base-font-size', `${newSize}px`);
  }

  logout() {
    // Cerrar el modal programáticamente si usas Bootstrap (opcional, pero buena práctica)
    // Cierra sesión en el servicio
    this.loginService.logout(); 
    
    // Redirigir a la página de inicio de sesión
    this.router.navigate(['/login']); 
  }
}