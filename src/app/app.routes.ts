import { Routes } from '@angular/router';
import { AyudaComponent } from './ayuda/ayuda.component';
import { ControlCursosComponent } from './control-cursos/control-cursos.component';
import { CursosComponent } from './cursos/cursos.component';
import { DocentesComponent } from './docentes/docentes.component';
import { EstudiantesComponent } from './estudiantes-con/estudiantes-con.component';
import { FormularioComponent } from './formulario/formulario.component';
import { HorariosComponent } from './horarios/horarios.component';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AuthGuard } from './services/auth-guard.service';
import { InicioComponent } from './inicio/inicio.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
    },
    {
      path: 'login',
      component: LoginComponent
      },
    {
      path: 'horarios',
      component: HorariosComponent, canActivate: [AuthGuard]
    },
    {
    path: 'cursos',
    component: CursosComponent, canActivate: [AuthGuard]
    },
    {
    path: 'ayuda',
    component: AyudaComponent, canActivate: [AuthGuard]
    },
    {
    path: 'perfil',
    component: PerfilComponent, canActivate: [AuthGuard]
    },
    {
    path: 'ControlEstudiantes',
    component: EstudiantesComponent
    },
    {
      path: 'ControlDocentes',
      component: DocentesComponent
      },
      {
      path: 'Formulario',
      component: FormularioComponent
      },
      {
      path: 'ControlCursos',
      component: ControlCursosComponent
      },
      {
        path : "Inicio",
        component : InicioComponent
      },

];
