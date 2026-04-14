import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { LoginService } from './../services/login.service';


@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  user: any; // Define la estructura del usuario según tus necesidades

  constructor(private LoginService: LoginService) {}

  ngOnInit(): void {
    this.user = this.LoginService.getUser(); // Obtiene el usuario almacenado en el servicio
    if (!this.user) {
      // Redigirir al login si no está autenticado
    }
  }
}
