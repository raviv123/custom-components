import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
  selector: 'd-input-password',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './custom-input-password.component.html',
  styleUrls: ['./custom-input-password.component.scss'],
})
export class CustomInputPasswordComponent {
  @Input() maxLength!: number;
  @Input() minLength!: number;
  @Input() placeholder: string = '';
  @Input() readonly: boolean = false;
  @Input() hideArrows: boolean = false;
  @Input() control!: FormControl;
  @Input() errorMessages: { [key: string]: string } = {};
  @Input() pattern: string =
    '^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$';

  hide = true;

  toggleVisibility() {
    this.hide = !this.hide;
  }

  validateInput(event: any) {
    const value = event.target.value;
    const regex = new RegExp(this.pattern);

    if (
      value.length < this.minLength ||
      value.length > this.maxLength ||
      !regex.test(value)
    ) {
      this.control.setErrors({ ...this.control.errors, invalidPattern: true });
    } else {
      const { invalidPattern, ...otherErrors } = this.control.errors || {};
      this.control.setErrors(
        Object.keys(otherErrors).length ? otherErrors : null
      );
    }
  }

  restrict(event: KeyboardEvent) {
    const allowedPattern = /[a-zA-Z0-9!@#$%^&*]/;
    if (!allowedPattern.test(event.key)) {
      event.preventDefault();
    }
  }

  disablePaste(event: ClipboardEvent): void {
    event.preventDefault();
  }
}
