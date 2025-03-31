import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { PhoneNumberComponent } from './components/phoneNumber/phone-number/phone-number.component';

@Component({
  selector: 'app-root',
  imports: [
    ReactiveFormsModule,
    PhoneNumberComponent
  ], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  form = new FormGroup({
    phone: new FormControl(''),
    });

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
