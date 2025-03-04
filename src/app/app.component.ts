import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

const errorMessages = {
  required: 'This is required',
  minlength: 'Please enter atlease 3 letters.',
  pattern: 'pattren is not correct',
  maxlength: 'maxlengh should be 10'
}

@Component({
  selector: 'app-root',
  imports: [ErrorMessageComponent,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  errorMessages: object = errorMessages;

  userForm: FormGroup = new FormGroup({
    phone: new FormControl('', [Validators.required, Validators.minLength(3),Validators.pattern('^[a-zA-Z]+$'),Validators.maxLength(10)])
  });

  title = 'dummyProject';
}
