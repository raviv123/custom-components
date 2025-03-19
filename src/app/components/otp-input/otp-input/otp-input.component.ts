import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-otp-input',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './otp-input.component.html',
  styleUrls: ['./otp-input.component.scss'],
})
export class OtpInputComponent implements OnInit {
  @Input() control!: FormControl;
  @Input() length: number = 4;
  @Input() type: 'numeric' | 'alphanumeric' = 'numeric';
  @Input() cssStyle: { [klass: string]: any } = {};
  @Input() hyphen: boolean = false;
  otpArray: number[] = [];
  otpValues: string[] = [];

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  ngOnInit() {
    this.otpArray = Array(this.length).fill(0);
    this.otpValues = Array(this.length).fill('');
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.otpInputs.first.nativeElement.focus();
    }, 100);
  }

  onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    this.otpValues[index] = input.value;
    this.updateControlValue();

    if (input.value && index < this.length - 1) {
      this.otpInputs.get(index + 1)?.nativeElement.focus();
    }
  }

  handlePaste(event: ClipboardEvent, index: number) {
    event.preventDefault();
    let pasteData = event.clipboardData?.getData('text') ?? '';
    if (this.hyphen) {
      pasteData = pasteData.replace(/-/g, '');
    }
    if (
      this.type === 'numeric'
        ? !/^\d+$/.test(pasteData)
        : /[^a-zA-Z0-9]/.test(pasteData)
    )
      return;
    const pasteValues = pasteData.split('');
    pasteValues.forEach((value, i) => {
      if (index + i < this.length) {
        this.otpValues[index + i] = value;
      }
    });
    this.updateControlValue();
    this.otpInputs.forEach((input, index) => {
      input.nativeElement.value = this.otpValues[index];
    });
    this.otpInputs
      .get(Math.min(index + pasteData.length, this.otpInputs.length - 1))
      ?.nativeElement.focus();
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace') {
      if (!this.otpValues[index] && index > 0) {
        this.otpInputs.get(index - 1)?.nativeElement.focus();
      }
      this.otpValues[index] = '';
      this.updateControlValue();
    }
  }

  restrictToNumbers(event: KeyboardEvent): void {
    const regex = this.type === 'numeric' ? /^[0-9]$/ : /^[a-zA-Z0-9]$/;
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  }
  updateControlValue() {
    this.control.setValue(
      this.hyphen
        ? this.otpValues
            .join('')
            .replace(/(.{3})/g, '$1-')
            .slice(0, -1)
        : this.otpValues.join('')
    );
  }
}
