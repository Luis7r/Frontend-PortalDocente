import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BarraFormComponent } from "../barraForm/barraForm.component";
import { NewEstudiante, NewestudianteService } from '../services/newestudiante.service';
import { Apoderado, ApoderadosService } from './../services/apoderados.service';
import { Vacantes, VacantesService } from './../services/vacantes.service';
import { CustomValidators } from '../validators/custom-validators';

@Component({
  selector: 'app-formulario', // Selector del componente
  standalone: true, // Indica que este componente es independiente
  imports: [BarraFormComponent, CommonModule, FormsModule, ReactiveFormsModule], // Módulos que se usarán
  templateUrl: './formulario.component.html', // Ruta al archivo HTML
  styleUrls: ['./formulario.component.css'] // Ruta al archivo CSS
})
export class FormularioComponent implements OnInit { // Clase del componente que implementa OnInit

  vacantes: number = 0; // Variable para almacenar el número de vacantes
  selectedGrado: number = 1; // Variable para almacenar el grado seleccionado
  allVacantes: Vacantes = []; // Array para almacenar todas las vacantes
  errorMessage: string | null = null; // Variable para almacenar mensajes de error
  newApoderado: Apoderado = this.initNewApoderado(); // Inicializa un nuevo objeto Apoderado
  NewEstudiante: NewEstudiante = this.initNewEstudiante(); // Inicializa un nuevo objeto Estudiante
  apoderadoForm: FormGroup;
  estudianteForm: FormGroup;

  // Constructor del componente
  constructor(
    private vacanteService: VacantesService, // Servicio para manejar vacantes
    private apoderadoService: ApoderadosService, // Servicio para manejar apoderados
    private newestudiante: NewestudianteService, // Servicio para manejar nuevos estudiantes
    private fb: FormBuilder,
  ) {
    this.apoderadoForm = this.fb.group({
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), CustomValidators.onlyNumbers]],
      nombre: ['', [Validators.required, CustomValidators.onlyLetters]],
      apellido: ['', [Validators.required, CustomValidators.onlyLetters]],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required, Validators.pattern(/^9\d{8}$/), CustomValidators.nonNegative]],
      direccion: ['', Validators.required]
    });

    this.estudianteForm = this.fb.group({
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), CustomValidators.onlyNumbers]],
      nombre: ['', [Validators.required, CustomValidators.onlyLetters]],
      apellido: ['', [Validators.required, CustomValidators.onlyLetters]],
      grado: ['', Validators.required],
    });
  }

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.loadVacantes(); // Llama al método para cargar vacantes al inicio
    this.registerValidationMessages();
  }

  registerValidationMessages(): void {
    Object.keys(this.apoderadoForm.controls).forEach(field => {
      this.apoderadoForm.get(field)?.statusChanges.subscribe(() => this.getValidationMessage('apoderado', field));
    });
    Object.keys(this.estudianteForm.controls).forEach(field => {
      this.estudianteForm.get(field)?.statusChanges.subscribe(() => this.getValidationMessage('estudiante', field));
    });
  }

  // Método para cargar las vacantes del grado seleccionado
  loadVacantes(): void {
    this.vacanteService.getVacantes(this.selectedGrado).subscribe(data => {
      this.allVacantes = data; // Almacena los datos de vacantes
      this.calculateVacantes(); // Calcula las vacantes
    }, error => {
      console.error('Error loading vacantes:', error);
      this.errorMessage = 'Could not load vacancies. Please try again later.'; // Manejo de errores
    });
  }

  // Método para calcular el total de vacantes basado en el grado seleccionado
  calculateVacantes(): void {
    const totalVacantes = this.allVacantes.reduce((total, vacante) => total + vacante.vacantes, 0);
    this.vacantes = totalVacantes; // Asigna el total a la propiedad vacantes
  }

  // Método que se llama cuando cambia el grado seleccionado
  onGradoChange(): void {
    this.loadVacantes(); // Recarga las vacantes
  }

  // Método para agregar un nuevo apoderado
  addApoderado(): void {
    if (this.apoderadoForm.invalid) {
      this.apoderadoForm.markAllAsTouched();
      return;
    }

    this.newApoderado = {
      ...this.newApoderado,
      ...this.apoderadoForm.value,
    };

    this.apoderadoService.addApoderado(this.newApoderado).subscribe(
      response => {
        this.newApoderado = this.initNewApoderado(); // Reinicia el formulario
        this.apoderadoForm.reset();
        this.errorMessage = null; // Limpia el mensaje de error
        // Asignar el id_apoderado del apoderado recién agregado al nuevo estudiante
        this.NewEstudiante.id_apoderado = response.id_apoderado; // Asegúrate de que este campo esté presente en la respuesta
      },
      error => {
        console.error('Error al agregar apoderado:', error);
        this.errorMessage = 'No se pudo agregar el apoderado. Inténtalo de nuevo más tarde.'; // Manejo de errores
      }
    );
  }

  // Método privado para inicializar un nuevo objeto Apoderado
  private initNewApoderado(): Apoderado {
    return {
      id_apoderado: 0,
      dni: '',
      nombre: '',
      apellido: '',
      email: '',
      celular: '',
      direccion: '',
    };
  }

  // Método para agregar un nuevo estudiante
  addNewEstudiante(): void {
    if (this.estudianteForm.invalid) {
      this.estudianteForm.markAllAsTouched();
      return;
    }

    this.NewEstudiante = {
      ...this.NewEstudiante,
      dni: this.estudianteForm.value.dni,
      nombre: this.estudianteForm.value.nombre,
      apellido: this.estudianteForm.value.apellido,
    };
    this.NewEstudiante.id_grado = this.selectedGrado; // Asignar el grado seleccionado
    this.newestudiante.addNewEstudiante(this.NewEstudiante).subscribe(
      response => {
        console.log('Estudiante agregado:', response);
        this.NewEstudiante = this.initNewEstudiante(); // Reinicia el formulario
        this.estudianteForm.reset();
      },
      error => {
        console.error('Error al agregar estudiante:', error);
        this.errorMessage = 'No se pudo agregar el estudiante. Inténtalo de nuevo más tarde.'; // Manejo de errores
      }
    );
  }

  // Método privado para inicializar un nuevo objeto Estudiante
  private initNewEstudiante(): NewEstudiante {
    return {
      id_estudiante: 0,
      dni: '',
      nombre: '',
      apellido: '',
      id_grado: null, // Asegúrate de que sea null
      id_apoderado: null,
    };
  }

  getValidationMessage(formType: 'apoderado' | 'estudiante', field: string): string {
    const form = formType === 'apoderado' ? this.apoderadoForm : this.estudianteForm;
    const control = form.get(field);

    if (!control || !control.errors) {
      return '';
    }

    if (control.errors['required']) {
      return 'Este campo es obligatorio.';
    }
    if (control.errors['minlength']) {
      return 'Debe tener 8 caracteres.';
    }
    if (control.errors['maxlength']) {
      return 'Debe tener 8 caracteres.';
    }
    if (control.errors['onlyNumbers']) {
      return 'Solo se permiten números.';
    }
    if (control.errors['onlyLetters']) {
      return 'Solo se permiten letras.';
    }
    if (control.errors['nonNegative']) {
      return 'No se permiten valores negativos.';
    }
    if (control.errors['pattern']) {
      return 'Debe tener 9 dígitos y comenzar con 9.';
    }
    if (control.errors['email']) {
      return 'Ingrese un correo válido.';
    }

    return '';
  }
}
