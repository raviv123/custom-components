import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
  selector: 'app-custom-input-number',
  imports: [ReactiveFormsModule,ErrorMessageComponent],
  standalone: true,
  templateUrl: './custom-input-number.component.html',
  styleUrl: './custom-input-number.component.scss'
})
export class CustomInputNumberComponent {
  @Input() value!: string;
  @Input() maxLength!: number;
  @Input() hideArrows!: boolean;
  @Input() control!: FormControl;
  @Input() errorMessages: { [key: string]: string } = {};;
  @Output() valueChange = new EventEmitter();

  ngOnInit() {  
    this.control.valueChanges.subscribe((value) => {
      this.valueChange.emit(value === '' ? '' : value);
    });
  }

  validateInput(event: any) {
    let inputValue = event.target.value;
    if (inputValue === '') {
      return;
    }  
    this.control.setValue(inputValue, { emitEvent: false }); 
    this.valueChange.emit(inputValue);
  }

  restrictFunction(event: any) {
    if (
      ['e', 'E'].includes(event.key) || 
      event.target.value.length >= this.maxLength || !/^\d+$/.test(event.key)
    ) {
      event.preventDefault();
    }
  }
}
