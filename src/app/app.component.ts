import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomInputNumberComponent } from './components/custom-input-number/custom-input-number.component';
import { CustomInputPasswordComponent } from './components/custom-input-password/custom-input-password.component';
import { CustomValidators } from './custom.validator';
import { TimepickerComponent } from './components/timepicker/timepicker.component';
import { CommonModule } from '@angular/common';

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
    TimepickerComponent
  ], //ErrorMessageComponent,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  errorMessages: { [key: string]: string } = errorMessages;


 
  form = new FormGroup(
    {
      time: new FormControl(new Date().setHours(11, 30, 0), [
        Validators.required,
      ]),
      startTime: new FormControl(new Date().setHours(12, 30, 0), [
        Validators.required,
      ]),
      endTime: new FormControl(new Date().setHours(12, 30, 0), [
        Validators.required,
      ])

    }
  );

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.form.reset();
    }
  }

  onTimeChange(event: string | { startTime: string, endTime: string }): void {
    console.log('Time Change Event:', event);
  }

  onOverlayOpened(): void {
    console.log('Overlay Opened Event');
  }

  onOverlayClosed(): void {
    console.log('Overlay Closed Event');
  }

  onTimeSelected(event: string | { startTime: string, endTime: string }): void {
    console.log('formValue', this.form.value); // The value will now include a Date instance
    console.log('Time Selected Event:', event);
  }

  onBlurEvent(): void {
    console.log('Blur Event');
  }
}
