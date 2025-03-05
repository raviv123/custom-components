import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
  selector: 'app-custom-input-number',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './custom-input-number.component.html',
  styleUrls: ['./custom-input-number.component.scss'],
})
export class CustomInputNumberComponent {
  @Input() maxLength!: number;
  @Input() minLength!: number;
  @Input() placeholder: string = '';
  @Input() readonly: boolean = false;
  @Input() hideArrows: boolean = false;
  @Input() control!: FormControl;
  @Input() allowDecimal: boolean = false;
  @Input() errorMessages: { [key: string]: string } = {};

  displayValue: string = '';

  ngOnInit() {
    this.displayValue = this.control.value?.toString() || '';
  }

  validateInput(event: Event) {
    if (!this.allowDecimal) return;
    const input = event.target as HTMLInputElement;
    // if (this.displayValue.startsWith('0') && input.value.length > 0) {
    //   input.value = '0' +  input.value.replace(/^0+/, '');
    // }
    // this.displayValue =  input.value;
    // this.control.setValue( input.value);

    if (input.value.includes('.')) {
      let parts = input.value.split('.');
      input.value = parts[0] + '.' + parts[1].slice(0, 2);
      if (this.control.value !== input.value) {
        this.control.setValue(input.value);
      }
    }
  }

  restrict(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    if (
      this.maxLength &&
      input.value.length >= this.maxLength &&
      event.key !== 'Backspace' &&
      event.key !== 'Delete'
    ) {
      event.preventDefault();
    }
    const isNumber = /^\d$/.test(event.key);
    const isDecimal = event.key === '.' && !input.value.includes('.');
    if (
      !this.allowDecimal &&
      !isNumber &&
      event.key !== 'Backspace' &&
      event.key !== 'Delete'
    ) {
      event.preventDefault();
    }
    if (
      this.allowDecimal &&
      !isNumber &&
      !isDecimal &&
      event.key !== 'Backspace' &&
      event.key !== 'Delete'
    ) {
      event.preventDefault();
    }
  }
}
