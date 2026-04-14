import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})



export class HeaderComponent {
  isSidebarActive: boolean = false;
  user: any;
  constructor(
    private router: Router,
    private loginService: LoginService,

  ) {}

  ngOnInit(): void {
  this.user = this.loginService.getUser();

  }

  logout() {
    this.loginService.logout(); // Cerrar sesión
    this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
}



}


