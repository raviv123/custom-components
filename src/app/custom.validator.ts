import { AbstractControl, ValidationErrors } from '@angular/forms';

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
