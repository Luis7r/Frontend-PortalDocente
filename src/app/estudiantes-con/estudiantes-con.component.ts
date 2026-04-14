import { CommonModule, NgFor } from '@angular/common'; // Importar módulos comunes para el componente
import { Component, OnInit } from '@angular/core'; // Importar el decorador Component y el ciclo de vida OnInit
import { FormsModule } from '@angular/forms'; // Importar el módulo de formularios para manejar formularios en el componente
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // Importar el módulo para usar modales de Bootstrap
import { BarraNavComponent } from '../barraNav/barraNav.component'; // Importar el componente de barra de navegación
import { Estudiante, EstudiantesService } from '../services/estudiantes.service'; // Importar modelo y servicio para gestionar estudiantes

import { NewEstudiante, NewestudianteService } from '../services/newestudiante.service'; // Importar servicio para agregar nuevos estudiantes
import { Apoderado, ApoderadosService } from './../services/apoderados.service'; // Importar modelo y servicio para gestionar apoderados
import { Vacantes, VacantesService } from './../services/vacantes.service'; // Importar modelo y servicio para gestionar vacantes
declare var bootstrap: any; // Declarar la variable bootstrap para usar funciones de Bootstrap

@Component({
    selector: 'app-estudiantes-con', // Selector del componente
    standalone: true, // El componente es independiente
    imports: [CommonModule, NgFor, FormsModule, BarraNavComponent], // Importar módulos y componentes necesarios
    templateUrl: './estudiantes-con.component.html', // Ruta a la plantilla HTML del componente
    styleUrls: ['./estudiantes-con.component.css'] // Ruta a los estilos CSS del componente
})
export class EstudiantesComponent implements OnInit { // Clase del componente
    estudiantes: Estudiante[] = []; // Lista de estudiantes que se mostrará en la tabla
    allStudents: Estudiante[] = []; // Almacena todos los estudiantes para búsquedas
    selectedGrade: string | null = null; // Grado seleccionado por el usuario
    errorMessage: string | null = null; // Mensaje para manejar errores
    searchDNI: string = ''; // Almacena el DNI para la búsqueda
    newApoderado: Apoderado = this.initNewApoderado(); // Inicializa un nuevo objeto Apoderado
    NewEstudiante: NewEstudiante = this.initNewEstudiante(); // Inicializa un nuevo objeto Estudiante
    vacantes: number = 0; // Variable para almacenar el número total de vacantes
    selectedGrado: number = 1; // Variable para almacenar el grado seleccionado
    allVacantes: Vacantes = []; // Almacena todas las vacantes disponibles

    constructor(
        private estudiantesService: EstudiantesService, // Servicio para gestionar estudiantes

        private vacanteService: VacantesService, // Servicio para gestionar vacantes
        private apoderadoService: ApoderadosService, // Servicio para gestionar apoderados
        private newestudiante: NewestudianteService, // Servicio para crear nuevos estudiantes
        private modalService: NgbModal, // Servicio para gestionar modales
    ) { }

    ngOnInit(): void {
        this.loadEstudiantes(); // Cargar estudiantes al iniciar el componente
        this.loadVacantes(); // Cargar vacantes al iniciar el componente
    }

    // Cargar todos los estudiantes desde la base de datos
    loadEstudiantes(): void {
        this.estudiantesService.getEstudiantes().subscribe(data => {
            this.estudiantes = data; // Asignar los estudiantes a la lista
            this.allStudents = [...data]; // Almacenar todos los estudiantes para búsquedas
        }, error => {
            console.error('Error al cargar estudiantes:', error);
            this.errorMessage = 'No se pudieron cargar los estudiantes. Inténtalo de nuevo más tarde.'; // Mensaje de error
        });
    }



    // Cerrar mensaje de error
    closeError(): void {
        this.errorMessage = null; // Reinicia el mensaje de error
    }

    // Barra de búsqueda de estudiante por DNI
    searchByDNI(): void {
        if (this.searchDNI) {
            this.estudiantes = this.allStudents.filter(estudiante => estudiante.dni.includes(this.searchDNI)); // Filtra estudiantes por DNI
            if (this.estudiantes.length === 0) {
                this.errorMessage = 'No se encontraron estudiantes con ese DNI.'; // Mensaje si no se encuentra ningún estudiante
            } else {
                this.errorMessage = null; // Limpia el mensaje de error
            }
        } else {
            this.estudiantes = [...this.allStudents]; // Si el campo de búsqueda está vacío, muestra todos los estudiantes
        }
    }

    // Mostrar todos los estudiantes
    showAll(): void {
        this.estudiantes = [...this.allStudents]; // Restablece la lista a todos los estudiantes
        this.selectedGrade = null; // Reinicia el grado seleccionado
    }

    // Método para agregar un nuevo estudiante
    addNewEstudiante(): void {
        this.NewEstudiante.id_grado = this.selectedGrado; // Asignar el grado seleccionado al nuevo estudiante
        this.newestudiante.addNewEstudiante(this.NewEstudiante).subscribe(
            response => {
                console.log('Estudiante agregado:', response); // Log para confirmar la adición
                this.NewEstudiante = this.initNewEstudiante(); // Reinicia el formulario de entrada
            },
            error => {
                console.error('Error al agregar estudiante:', error);
                this.errorMessage = 'No se pudo agregar el estudiante. Inténtalo de nuevo más tarde.'; // Mensaje de error
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
            id_grado: null, // Asegúrate de que sea null inicialmente
            id_apoderado: null, // También null al inicio
        };
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

    // Método para agregar un nuevo apoderado
    addApoderado(): void {
        this.apoderadoService.addApoderado(this.newApoderado).subscribe(
            response => {
                this.newApoderado = this.initNewApoderado(); // Reinicia el formulario de entrada
                this.errorMessage = null; // Limpia el mensaje de error
                // Asignar el id_apoderado del apoderado recién agregado al nuevo estudiante
                this.NewEstudiante.id_apoderado = response.id_apoderado; // Asegúrate de que este campo esté presente en la respuesta
            },
            error => {
                console.error('Error al agregar apoderado:', error);
                this.errorMessage = 'No se pudo agregar el apoderado. Inténtalo de nuevo más tarde.'; // Mensaje de error
            }
        );
    }

    // Método que se llama cuando cambia el grado seleccionado
    onGradoChange(): void {
        this.loadVacantes(); // Recarga las vacantes al cambiar el grado
    }

    // Método para calcular el total de vacantes basado en el grado seleccionado
    calculateVacantes(): void {
        const totalVacantes = this.allVacantes.reduce((total, vacante) => total + vacante.vacantes, 0); // Sumar las vacantes
        this.vacantes = totalVacantes; // Asigna el total a la propiedad vacantes
    }

    // Método para cargar las vacantes del grado seleccionado
    loadVacantes(): void {
        this.vacanteService.getVacantes(this.selectedGrado).subscribe(data => {
            this.allVacantes = data; // Almacena los datos de vacantes
            this.calculateVacantes(); // Calcula el total de vacantes
        }, error => {
            console.error('Error al cargar vacantes:', error);
            this.errorMessage = 'No se pudieron cargar las vacantes. Inténtalo de nuevo más tarde.'; // Mensaje de error
        });
    }

    // Método para abrir el modal para agregar un nuevo estudiante
    openModal() {
        const modalElement = document.getElementById('addNewEstudianteModal');
        if (modalElement) {
            const modal = new bootstrap.Modal(modalElement); // Crear una nueva instancia de modal
            modal.show(); // Mostrar el modal
        }
    }

    // Método para abrir el modal del apoderado
    openApoderadoModal() {
        const modalElement = document.getElementById('addNewApoderadoModal');
        if (modalElement) {
            const modal = new bootstrap.Modal(modalElement); // Crear una nueva instancia de modal
            modal.show(); // Mostrar el modal
        }
    }
}
