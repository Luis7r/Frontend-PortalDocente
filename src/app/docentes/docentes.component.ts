import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BarraNavComponent } from '../barraNav/barraNav.component';
import { Docente, DocentesService } from './../services/docentes.service';
import { CustomValidators } from '../validators/custom-validators';

@Component({
  selector: 'app-docentes',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,  BarraNavComponent],
  templateUrl: './docentes.component.html',
  styleUrls: ['./docentes.component.css']
})
export class DocentesComponent implements OnInit {
  docentes: Docente[] = [];
  allTeacher: Docente[] = [];
  errorMessage: string | null = null;
  searchDNI: string = '';
  showPassword: boolean = false;
  docenteForm: FormGroup;

  constructor(
    private docentesService: DocentesService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {


    this.docenteForm = this.fb.group({
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), CustomValidators.onlyNumbers, CustomValidators.nonNegative]],
      nombre: ['', [Validators.required, CustomValidators.onlyLetters]],
      apellido: ['', [Validators.required, CustomValidators.onlyLetters]],
      profesion: ['', [Validators.required, CustomValidators.onlyLetters]],
      num_cursos: ['', [Validators.required, CustomValidators.onlyNumbers, CustomValidators.nonNegative]],
      celular: ['', [Validators.required, Validators.pattern(/^9\d{8}$/), CustomValidators.onlyNumbers, CustomValidators.nonNegative]],
      codigo_docente: ['', Validators.required],
      usuario: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required]
    });
  }


  ngOnInit(): void {
    this.loadDocentes();
    Object.keys(this.docenteForm.controls).forEach(field => {
      const control = this.docenteForm.get(field);
      control?.statusChanges.subscribe(() => {
        this.getValidationMessage(field);
      });
    });
  }

  // Load teachers from the service
  loadDocentes(): void {
    this.docentesService.getDocentes().subscribe(
      data => {
        this.docentes = data;
        this.allTeacher = [...data];
      },
      error => {
        console.error('Error al cargar profesores:', error);
        this.errorMessage = 'No se pudieron cargar los profesores. Inténtalo de nuevo más tarde.';
      }
    );
  }

  // Add a new teacher
  addDocente(): void {
    if (this.docenteForm.valid) {
      const newDocente: Docente = this.docenteForm.value;
      this.docentesService.addDocente(newDocente).subscribe(
        response => {
          this.loadDocentes();
          this.docenteForm.reset();
          this.errorMessage = null;
        },
        error => {
          console.error('Error al agregar docente:', error);
          this.errorMessage = 'No se pudo agregar el docente. Inténtalo de nuevo más tarde.';
        }
      );
    }
  }

  // Errores de Validación
  getValidationMessage(field: string): string {
    const control = this.docenteForm.get(field);
    if (control?.errors) {
      if (control.errors['required']) {
        return 'Este campo es obligatorio.';
      }
      if (control.errors['minlength'] || control.errors['maxlength']) {
        if (field === 'dni') {
          return 'El DNI debe tener exactamente 8 dígitos.';
        }
      }
      if (control.errors['pattern']) {
        if (field === 'celular') {
          return 'El número de celular debe tener 9 dígitos y comenzar con 9.';
        }
      }
      if (control.errors['onlyNumbers']) {
        return 'Solo se aceptan números.';
      }
      if (control.errors['onlyLetters']) {
        return 'Solo se aceptan letras.';
      }
      if (control.errors['nonNegative']) {
        return 'No se permiten valores negativos.';
      }
      if (control.errors['email']) {
        return 'Debe ingresar un correo electrónico válido.';
      }
    }
    return '';
  }


  //Mostrar Contraseña
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  eliminarDocente(dni: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar a este docente?')) {
      this.docentesService.deleteDocente(dni).subscribe(
        response => {
          // Actualiza la lista de docentes después de la eliminación
          this.loadDocentes();
          this.errorMessage = null;
        },
        error => {
          console.error('Error al eliminar docente:', error);
          this.errorMessage = 'No se pudo eliminar el docente. Inténtalo de nuevo más tarde.';
        }
      );
    }
  }
}
