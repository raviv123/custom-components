import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDatepickerInputEvent, MatDatepickerModule, MatDateRangeInput, MatDateRangePicker } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatFormFieldAppearance } from '@angular/material/form-field';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FloatLabelType } from '@angular/material/form-field';

@Component({
  selector: 'app-matdatepicker',
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatDateRangeInput, MatDateRangePicker, ReactiveFormsModule, MatButtonModule, MatNativeDateModule ],
  standalone: true,
  providers: [provideNativeDateAdapter()],
  templateUrl: './matdatepicker.component.html',
  styleUrl: './matdatepicker.component.scss'
})
export class MatdatepickerComponent {
  @Input() dateRange: boolean = false;
  @Input() placeholder!: string;
  @Input() disabled: boolean = false;
  @Input() overlayDisabled: boolean = false;
  @Input() onlyInputDisabled: boolean = false;
  @Input() control!: FormControl;
  @Input() startControl!: FormControl;
  @Input() endControl!: FormControl;
  @Input() showActionButtons: boolean = false;
  @Input() startView: 'month' | 'year' | 'multi-year' = 'month';
  @Input() startAt: Date | null = new Date(2025, 12, 17);
  @Input() startDatePlaceholder: string = 'Start date';
  @Input() endDatePlaceholder: string = 'End date';
  @Input() appearance: MatFormFieldAppearance = 'fill';
  @Input() floatLabel: FloatLabelType = 'auto';
  @Input() showHint: boolean = true;

  @Output() dateChange = new EventEmitter<Date | null>();
  @Output() dateInput = new EventEmitter<Date | null>();
  @Output() dateSelected = new EventEmitter<Date | null>();
  @Output() dateNavigationChange = new EventEmitter<Date>();
  @Output() yearSelected = new EventEmitter<Date>();
  @Output() monthSelected = new EventEmitter<Date>();
  
  // Events for date range picker
  @Output() rangeChange = new EventEmitter<{start: Date | null, end: Date | null}>();
  @Output() rangeInput = new EventEmitter<{start: Date | null, end: Date | null}>();
  @Output() startDateSelected = new EventEmitter<Date>();
  @Output() startDateChange = new EventEmitter<Date | null>();
  @Output() startDateInput = new EventEmitter<Date | null>();
  @Output() endDateSelected = new EventEmitter<Date>();
  @Output() endDateChange = new EventEmitter<Date | null>();
  @Output() endDateInput = new EventEmitter<Date | null>();
  
  // General events
  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();
  @Output() invalidInput = new EventEmitter<void>();
  @Output() onBlur = new EventEmitter<void>();

  constructor() {
    this._intializeForm();
  }

  private _intializeForm() {
    if (this.dateRange) {
      if (this.disabled) {
        this.startControl.disable();
        this.endControl.disable();
      }
    } else {
      if (this.disabled) {
        this.control.disable();
      }
    }
  }

  onSingleDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.dateChange.emit(event.value);
  }
  
  onSingleDateInput(event: MatDatepickerInputEvent<Date>): void {
    this.dateInput.emit(event.value);
  }
  
  // Event handlers for date range picker
  onStartDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.startDateChange.emit(event.value);
    this.emitRangeChange();
  }
  
  onStartDateInput(event: MatDatepickerInputEvent<Date>): void {
    this.startDateInput.emit(event.value);
    this.emitRangeInput();
  }
  
  onEndDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.endDateChange.emit(event.value);
    this.emitRangeChange();
  }
  
  onEndDateInput(event: MatDatepickerInputEvent<Date>): void {
    this.endDateInput.emit(event.value);
    this.emitRangeInput();
  }
  
  // Picker event handlers
  onCalendarOpened(): void {
    this.opened.emit();
  }
  
  onCalendarClosed(): void {
    this.closed.emit();
  }
  
  onDateSelected(event: MatDatepickerInputEvent<Date, any>): void {
    this.dateSelected.emit(event.value);
  }
  
  onStartDateSelected(date: Date): void {
    this.startDateSelected.emit(date);
  }
  
  onEndDateSelected(date: Date): void {
    this.endDateSelected.emit(date);
  }
  
  onYearSelected(normalizedYear: Date): void {
    this.yearSelected.emit(normalizedYear);
  }
  
  onMonthSelected(normalizedMonth: Date): void {
    this.monthSelected.emit(normalizedMonth);
  }
  
  onDateNavigationChange(date: Date): void {
    this.dateNavigationChange.emit(date); 
  }

  onTouched() {
    this.onBlur.emit()
  }

  private emitRangeChange(): void {
    const range = { 
      start: this.startControl.value, 
      end: this.endControl.value 
    };
    this.rangeChange.emit(range);
  }

  private emitRangeInput(): void {
    const range = { 
      start: this.startControl.value, 
      end: this.endControl.value 
    };
    this.rangeInput.emit(range);
  }
}

