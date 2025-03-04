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
   this.value = event.target.value;
    if (this.value === '') {
      return;
    }
    this.valueChange.emit(this.value);
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
