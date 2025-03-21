import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'd-custom-input-file',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule],
  template: `<mat-label>{{ label }}</mat-label>
    <input
      type="file"
      [accept]="accept"
      [multiple]="multiple"
      (change)="onFileSelected($event)"
    />`,
  styleUrl: './custom-input-file.component.scss',
})
export class CustomInputFileComponent {
  @Input() control!: FormControl;
  @Input() formGroup!: FormGroup;
  @Input() label!: string;
  @Input() multiple: boolean = false;
  @Input() accept!: any;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.control.setValue(input.files);
    } else {
      this.control.setValue(null);
    }
  }
}
