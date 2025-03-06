import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
  selector: 'd-input-password',
  imports: [ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './custom-input-password.component.html',
  styleUrl: './custom-input-password.component.scss',
})
export class CustomInputPasswordComponent {
  @Input() maxLength!: number;
  @Input() minLength!: number;
  @Input() placeholder: string = '';
  @Input() readonly: boolean = false;
  @Input() hideArrows: boolean = false;
  @Input() control!: FormControl;
  @Input() errorMessages: { [key: string]: string } = {};


  validateInput(event: any) {}

  restrict(event: any) {
    
  }

  disablePaste(event: ClipboardEvent): void {
    event.preventDefault();
  }
}
