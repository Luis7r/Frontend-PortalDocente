import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static onlyNumbers(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value === null || value === undefined || value === '') {
      return null;
    }

    const isValid = /^\d+$/.test(value.toString());
    return isValid ? null : { onlyNumbers: true };
  }

  static onlyLetters(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value === null || value === undefined || value === '') {
      return null;
    }

    const isValid = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value.toString());
    return isValid ? null : { onlyLetters: true };
  }

  static nonNegative(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value === null || value === undefined || value === '') {
      return null;
    }

    const numericValue = Number(value);
    return Number.isFinite(numericValue) && numericValue >= 0 ? null : { nonNegative: true };
  }
}
