import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { OtpInputComponent } from './components/otp-input/otp-input/otp-input.component';

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
    // CustomInputNumberComponent,
    // CustomInputPasswordComponent,
    OtpInputComponent,
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

  // form = new FormGroup(
  //   {
  //     number: new FormControl('', [
  //       Validators.required,
  //       CustomValidators.minMaxLengthValidator(2, 10),
  //     ]),
  //     newPassword: new FormControl('', [
  //       Validators.required,
  //       Validators.minLength(8),
  //       Validators.pattern(
  //         '^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$'
  //       ),
  //     ]),
  //     confirmPassword: new FormControl('', [Validators.required]),
  //   },
  //   {
  //     validators: CustomValidators.fieldsMatchValidator(
  //       'newPassword',
  //       'confirmPassword'
  //     ),
  //   }
  // );

  // submit() {
  //   if (this.form.valid) {
  //     console.log(this.form.value);
  //     this.form.reset();
  //   }
  // // }
  // otpControl = 
  // otpControl1 = new FormControl('');
  form = new FormGroup({
    otp: new FormControl(''),
    otp1: new FormControl('')
  });

  submit() {
    console.log(this.form.value);
    this.form.reset();
  }
}
