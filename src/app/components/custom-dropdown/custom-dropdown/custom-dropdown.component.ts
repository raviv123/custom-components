
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOption, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'd-custom-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatOption,
    ReactiveFormsModule,
  ],
  templateUrl: './custom-dropdown.component.html',
  styleUrl: './custom-dropdown.component.scss',
})
export class CustomDropdownComponent {
  @Input() control!: FormControl;
  @Input() label = 'Select an option';
  @Input() options: { value: string; label: string }[] = [];
  @Input() multiple = false;

}
