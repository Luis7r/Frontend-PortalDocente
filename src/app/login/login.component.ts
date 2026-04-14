import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule, ReactiveFormsModule]
})
export class LoginComponent {

  formUser: FormGroup;

  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {


    this.formUser = this.fb.group({
      'correo': ['', [Validators.required, Validators.email]],
      'clave': ['', Validators.required]
    });
  }

  get correo() {
    return this.formUser.get('correo') as FormControl;
  }

  get clave() {
    return this.formUser.get('clave') as FormControl;
  }

  Ingresar() {
    this.errorMessage = '';


    const email = this.formUser.get('correo')?.value;
    const password = this.formUser.get('clave')?.value;

    this.loginService.login(email, password).subscribe({
      next: (response) => {
        if (response.success) {
          this.router.navigate(['/cursos']);
        }
      },
      error: () => {
        this.errorMessage = 'Credenciales Incorrectas';
      }
    });
  }
}
