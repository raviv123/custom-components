import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomInputNumberComponent } from './components/custom-input-number/custom-input-number.component';
import { minMaxLengthValidator, passwordMatchValidator } from './custom.validator';
import { CustomInputPasswordComponent } from './components/custom-input-password/custom-input-password.component';

const errorMessages = {
  required: 'This is required',
  minlength: 'Please enter atlease 3 letters.',
  pattern: 'pattren is not correct',
  maxlength: 'maxlengh should be 10',
};

@Component({
  selector: 'app-root',
  imports: [
    ReactiveFormsModule,
    CustomInputNumberComponent,
    CustomInputPasswordComponent,
  ], //ErrorMessageComponent,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  errorMessages: { [key: string]: string } = errorMessages;

  //   userForm: FormGroup = new FormGroup({
  //     phone: new FormControl('', [Validators.required, Validators.minLength(3),Validators.pattern('^[a-zA-Z]+$'),Validators.maxLength(10)])
  //   });

  //   title = 'dummyProject';
  // }

  form = new FormGroup({
    number: new FormControl('', [
      Validators.required,
      minMaxLengthValidator(2, 10),
    ]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
    ]),
  },passwordMatchValidator());

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.form.reset();
    }
  }
}
