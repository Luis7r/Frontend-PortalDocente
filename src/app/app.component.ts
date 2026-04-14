import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AyudaComponent } from "./ayuda/ayuda.component";
import { BarraFormComponent } from './barraForm/barraForm.component';
import { BarraNavComponent } from './barraNav/barraNav.component';
import { CursosComponent } from "./cursos/cursos.component";
import { DocentesComponent } from './docentes/docentes.component';
import { EstudiantesComponent } from './estudiantes-con/estudiantes-con.component';
import { FormularioComponent } from './formulario/formulario.component';
import { HeaderComponent } from "./header/header.component";
import { InicioComponent } from "./inicio/inicio.component";
import { LoginComponent } from "./login/login.component";
import { PerfilComponent } from "./perfil/perfil.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, InicioComponent, PerfilComponent, HeaderComponent, AyudaComponent, CursosComponent, EstudiantesComponent, DocentesComponent, BarraNavComponent, BarraFormComponent, FormularioComponent],
  templateUrl: './app.component.html',
  styleUrl:'./app.component.css'
})
export class AppComponent {
  title = 'WebProyecto';
}
