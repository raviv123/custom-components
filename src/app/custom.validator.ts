import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export class CustomValidators {
  static minMaxLengthValidator(
    minLength: number,
    maxLength: number
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value?.toString() || '';
      if (value.length < minLength) {
        return {
          minlength: { requiredLength: minLength, actualLength: value.length },
        };
      }
      if (value.length > maxLength) {
        return {
          maxlength: { requiredLength: maxLength, actualLength: value.length },
        };
      }
      return null;
    };
  }

  static fieldsMatchValidator(field1: string, field2: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      const value1 = formGroup.get(field1)?.value;
      const value2 = formGroup.get(field2)?.value;

      if (value1 !== value2) {
        return { fieldsMismatch: true };
      }

      return null;
    };
  }
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

export function minDateValidator(minDate: Date): ValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) {
      return null; // Return null if the field is empty (handled by required validator)
    }

    const inputDate = new Date(control.value).getTime();
    const min = minDate.getTime();

    if (inputDate < min) {
      return { minDate: { requiredMin: minDate, actual: control.value } };
    }

    return null; // No error
  };
}

export function maxDateValidator(maxDate: Date): ValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) {
      return null; // Return null if the field is empty (handled by required validator)
    }

    const inputDate = new Date(control.value).getTime();
    const max = maxDate.getTime();

    if (inputDate > max) {
      return { maxDate: { requiredMax: maxDate, actual: control.value } };
    }

    return null; // No error
  };
}

export function dateRangeValidator(minDate: Date, maxDate: Date): ValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) return null; // Ignore empty values (handled by required validator)

    const inputTimestamp = new Date(control.value).getTime();
    const minTimestamp = minDate.getTime();
    const maxTimestamp = maxDate.getTime();

    if (isNaN(inputTimestamp)) {
      return { invalidDate: { actual: control.value } };
    }
    if (inputTimestamp < minTimestamp) {
      return { noValidDate: { requiredMin: minDate.toISOString().split('T')[0], actual: control.value } };
    }
    if (inputTimestamp > maxTimestamp) {
      return { noValidDate: { requiredMax: maxDate.toISOString().split('T')[0], actual: control.value } };
    }

    return null; // No error
  };
}
