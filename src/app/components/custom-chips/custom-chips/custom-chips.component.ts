import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'd-custom-chips',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatAutocompleteModule,
    MatChipsModule,
  ],
  templateUrl: './custom-chips.component.html',
  styleUrl: './custom-chips.component.scss',
})
export class CustomChipsComponent implements OnInit {
  @Input() label: string = '';
  @Input() options: string[] = [];
  @Input() formControl!: FormControl;
  @Input() formGroup!: FormGroup;
  @Input() placeholder!: string;
  @Output() chipsChanged = new EventEmitter<string[]>();

  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredOptions: string[] = [];
  chips: string[] = [];

  ngOnInit() {
    this.filteredOptions = [...this.options];
    this.chips = this.formControl.value || [];
  }

  add(event: MatChipInputEvent) {
    const value = (event.value || '').trim();
    if (value && !this.chips.includes(value)) {
      this.chips.push(value);
      this.updateChips();
    }
    event.chipInput.clear();
    this.resetFilter();
  }

  remove(index: number) {
    this.chips.splice(index, 1);
    this.updateChips();
    this.resetFilter();
  }

  filterOptions(event: any) {
    const filterValue = event.target.value.toLowerCase();
    this.filteredOptions = this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  selected(event: MatAutocompleteSelectedEvent) {
    const value = event.option.viewValue;
    if (!this.chips.includes(value)) {
      this.chips.push(value);
      this.updateChips();
    }
    this.resetFilter();
  }

  addFirstFilteredOption(event: any) {
    if (this.filteredOptions.length > 0) {
      event.preventDefault();
      const firstOption = this.filteredOptions[0];
      if (!this.chips.includes(firstOption)) {
        this.chips.push(firstOption);
        this.updateChips();
      }
    }
    this.resetFilter();
  }

  updateChips() {
    this.formControl.setValue([...this.chips]);
    this.chipsChanged.emit([...this.chips]);
  }

  resetFilter() {
    this.filteredOptions = [...this.options];
  }

  handleKeyDown(event: any, inputElement: HTMLInputElement) {
    if (event.key === 'Backspace' && inputElement.value === '') {
      event.preventDefault();
      if (this.chips.length > 0) {
        this.remove(this.chips.length - 1);
        inputElement.focus();
      }
    }
  }
}
