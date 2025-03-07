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
