import { CommonModule } from '@angular/common';
import { Component, Input, Signal, signal } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.scss'
})
export class ErrorMessageComponent {
  _validation!: { errors: Object | null; messages: any };
  _control!: AbstractControl;
  errorKeys: string[] = [];

  @Input() showMultipleErrors: boolean = false;


  @Input()
  set control(control: AbstractControl) {
    this._control = control
    this.formControl = signal(control);
  } 


  @Input({ required: true }) 
  set validation(value: { errors: Object | null; messages: any }) {
    this._validation = value;
    this.updateErrorKeys();
  }

  private updateErrorKeys(): void {
      this.errorKeys = this._validation?.errors && typeof this._validation.errors === 'object'
      ? Object.keys(this._validation.errors)
      : [];
  }

  @Input() markAsTouched: boolean = false;
  @Input() cssStyle!: { [klass: string]: string | number };

  formControl!: Signal<AbstractControl>;

}
