import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minMaxLengthValidator(minLength: number, maxLength: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.toString() || '';
    if (value.length < minLength) {
      return {
        minLength: { requiredLength: minLength, actualLength: value.length },
      };
    }
    if (value.length > maxLength) {
      return {
        maxLength: { requiredLength: maxLength, actualLength: value.length },
      };
    }
    return null;
  };
}

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (newPassword !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  };
}