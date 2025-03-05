import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomInputNumberComponent } from './components/custom-input-number/custom-input-number.component';
import { minMaxLengthValidator } from './custom.validator';

const errorMessages = {
  required: 'This is required',
  minlength: 'Please enter atlease 3 letters.',
  pattern: 'pattren is not correct',
  maxlength: 'maxlengh should be 10'
}

@Component({
  selector: 'app-root',
  imports: [ ReactiveFormsModule,CustomInputNumberComponent], //ErrorMessageComponent,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
    errorMessages: { [key: string]: string } = errorMessages;

  //   userForm: FormGroup = new FormGroup({
  //     phone: new FormControl('', [Validators.required, Validators.minLength(3),Validators.pattern('^[a-zA-Z]+$'),Validators.maxLength(10)])
  //   });

  //   title = 'dummyProject';
  // }

  form = new FormGroup({
    number: new FormControl('', [Validators.required, minMaxLengthValidator(5,8)]),
  });

  submit() { 
    if (this.form.valid) {
      console.log(this.form.value);
      this.form.reset()
    }
  }
}
