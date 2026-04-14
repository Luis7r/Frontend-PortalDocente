import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { Horario, HorariosService } from '../services/horarios.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-horarios',
  standalone: true,
  imports: [HeaderComponent, NgFor, NgIf],
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {
  errorMessage: string | null = null;
  horarios: Horario[] = [];
  horariosPorDia: { [key: string]: Horario[] } = {};
  horariosPorHora: { [key: string]: { [hora: string]: Horario[] } } = {}; // Nueva estructura de datos
  days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
  horas: string[] = []; // Vamos a llenar esta lista con las horas de inicio únicas
  user: any;

  constructor(
    private horariosService: HorariosService,
    private loginService: LoginService) {}

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    if (!this.user || !this.user.id_profesor) {
      console.error('Usuario no autenticado.');
      return;
    }

    this.horariosService.getHorariosByProfesor(this.user.id_profesor).subscribe({
      next: (horarios) => {
        this.horarios = horarios;
      },
      error: (err) => {
        console.error('Error al obtener los horarios', err);
      }
    });
 this.loadHorarios();

  }

  loadHorarios(): void {
    this.horariosService.getHorariosByProfesor(this.user.id_profesor).subscribe(
      data => {
        this.horarios = data; // Asignar los horarios a la lista
        this.extraerHorasUnicas(); // Obtener las horas únicas
        this.agruparHorariosPorDiaYHora(); // Agrupar los horarios por día y hora
      },
      error => {
        console.error('Error al cargar horarios:', error);
        this.errorMessage = 'No se pudieron cargar los horarios. Inténtalo de nuevo más tarde.';
      }
    );
  }

  extraerHorasUnicas(): void {
    // Extraemos todas las horas de inicio únicas
    const horasUnicas = new Set(this.horarios.map(h => h.HoraInicio));
    this.horas = Array.from(horasUnicas).sort(); // Ordenamos las horas de inicio
  }

  agruparHorariosPorDiaYHora(): void {
    this.horariosPorHora = this.days.reduce((acc, dia) => {
      acc[dia] = this.horas.reduce((horaAcc, hora) => {
        horaAcc[hora] = this.horarios.filter(horario => horario.Dia === dia && horario.HoraInicio === hora);
        return horaAcc;
      }, {} as { [hora: string]: Horario[] });
      return acc;
    }, {} as { [key: string]: { [hora: string]: Horario[] } });
  }
}
