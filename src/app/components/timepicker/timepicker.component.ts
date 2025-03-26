import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, Renderer2, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-timepicker',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './timepicker.component.html',
  styleUrl: './timepicker.component.scss'
})
export class TimepickerComponent implements OnInit, AfterViewInit {
  @Input() control!: FormControl;
  @Input() startTimeControl!: FormControl;
  @Input() endTimeControl!: FormControl;
  @Input() initialTime: string = '12:00 PM';
  @Input() range: boolean = false;
  @Input() interval: number = 15; // Interval in minutes, default to 30 minutes
  @Input() use24HourFormat: boolean = false; // New property to toggle 24-hour format
  @Input() restrictEndTime: boolean = true; // New property to enable/disable end time restriction
  @Input() showTimeGapInEndList: boolean = true   ; // New property to enable/disable time gap display in end time list
  @Output() timeChange = new EventEmitter<string | { startTime: string, endTime: string }>();
  @Output() overlayOpened = new EventEmitter<void>(); // Event for overlay opening
  @Output() overlayClosed = new EventEmitter<void>(); // Event for overlay closing
  @Output() timeSelected = new EventEmitter<string | { startTime: string, endTime: string }>(); // Event for time selection
  @Output() onBlur = new EventEmitter<void>(); // Event for blur

  @ViewChild('timePickerContainer') timePickerContainer!: ElementRef;

  timeForm!: FormGroup;
  timeOptions: string[] = []; // Combined list of time options
  isOpen: boolean = false;
  isEndOpen: boolean = false;
  isStartOpen: boolean = false;
  private documentClickListener: (() => void) | null = null;

  constructor(
    private fb: FormBuilder,
    private renderer: Renderer2,
    private elRef: ElementRef
  ) {}

  ngAfterViewInit(): void {
    this._subscribeToOverlayOpen();
  }

  ngOnInit(): void {
    if ((!this.control || (this.range && (!this.startTimeControl && !this.endTimeControl))) && (!this.startTimeControl || !this.endTimeControl)) {
      this.timeForm = this.fb.group(this.range ? {
        startTime: [this._convertToDate(new Date().setHours(12, 30, 0)), Validators.required],
        endTime: [this._convertToDate(new Date().setHours(12, 30, 0)), Validators.required]
      } : {
        time: [this._convertToDate(new Date().setHours(12, 30, 0)), Validators.required]
      });
    this.generateTimeOptions();
      return;
    }

    // Convert initial values to Date instances if they are timestamps or strings
    if (this.control && ( typeof this.control.value === 'number'  || typeof this.control.value === 'string')) {
      this.control.setValue(this._convertToDate(this.control.value));
    }

    if (this.startTimeControl && (typeof this.startTimeControl.value === 'number' || typeof this.startTimeControl.value === 'string')) {
      this.startTimeControl.setValue(this._convertToDate(this.startTimeControl.value));
    }

    if (this.endTimeControl && (typeof this.endTimeControl.value === 'number' || typeof this.endTimeControl.value === 'string')) {
      this.endTimeControl.setValue(this._convertToDate(this.endTimeControl.value));
    }


    this.generateTimeOptions();
  }

  private _convertToDate(value: string | number): Date {
    if (typeof value === 'number') {
      return new Date(value); // Convert timestamp to Date
    }
    if (typeof value === 'string') {
      return new Date(value); // Convert ISO string or formatted string to Date
    }
    return value as Date; // If already a Date instance, return as is
  }

  private _subscribeToOverlayOpen(): void {
    if (this.isOpen || this.isStartOpen || this.isEndOpen) {
      setTimeout(() => {
        const selectedTime = this.isEndOpen
          ? this.endTimeControl?.value || this.timeForm.get('endTime')?.value
          : this.isStartOpen
            ? this.startTimeControl?.value || this.timeForm.get('startTime')?.value
            : this.control?.value || this.timeForm?.get('time')?.value;

        this.scrollToSelectedOption(selectedTime);
        this.overlayOpened.emit(); // Emit overlay opened event
      });
    }
  }

  private scrollToSelectedOption(selectedTime: string | null): void {
    if (!this.timePickerContainer) return;

    const container = this.timePickerContainer.nativeElement;
    if (!selectedTime) {
      container.scrollTop = 0; // Scroll to the top if no option is selected
      return;
    }

    const selectedElement = Array.from(container.querySelectorAll('li')).find(
      (el) => (el as HTMLElement).classList.contains('selected')
    );

    if (selectedElement) {
      container.scrollTop = (selectedElement as HTMLElement).offsetTop - container.offsetTop;
    }
  }

  generateTimeOptions(): void {
    this.timeOptions = [];
    debugger
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute = minute + this.interval) {
        const formattedHour = this.use24HourFormat
          ? hour.toString().padStart(2, '0')
          : ((hour % 12) || 12).toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        const period = this.use24HourFormat ? '' : hour < 12 ? ' AM' : ' PM';
        this.timeOptions.push(`${formattedHour}:${formattedMinute}${period}`);
      }
    }
  }

  getFilteredTimeOptions(): string[] {
    const startTime = this.timeForm.get('startTime')?.value as Date;

    // If showTimeGapInEndList is true, generate options with time gaps
    if (this.showTimeGapInEndList) {
      const filteredOptions: string[] = [];
      let gapMinutes = this.interval;

      for (const option of this.timeOptions) {
        const optionDate = this._getDateWithTime(option);

        if (!startTime || (this.restrictEndTime && optionDate <= startTime)) {
          // If restrictEndTime is true, skip options earlier than or equal to the selected start time
          if (this.restrictEndTime) continue;

          // Include options earlier than or equal to the selected start time without time gap
          filteredOptions.push(option);
        } else {
          // Include options after the selected start time with time gap
          const gapHours = Math.floor(gapMinutes / 60);
          const gapRemainderMinutes = gapMinutes % 60;
          const gapLabel = gapHours > 0
            ? `${gapHours} Hour${gapHours > 1 ? 's' : ''}${gapRemainderMinutes > 0 ? ` ${gapRemainderMinutes} Minutes` : ''}`
            : `${gapRemainderMinutes} Minutes`;

          filteredOptions.push(`${option} (${gapLabel})`);
          gapMinutes += this.interval; // Increment the gap for the next option
        }
      }

      return filteredOptions;
    }

    // Default behavior: Return all options if restrictEndTime is false
    if (!this.restrictEndTime) {
      return this.timeOptions;
    }

    // Filter options to exclude times earlier than the selected start time
    if (startTime) {
      return this.timeOptions.filter((option) => {
        const optionDate = this._getDateWithTime(option);
        return optionDate > startTime; // Only include times later than the selected start time
      });
    }

    return this.timeOptions; // Return all options if no start time is selected
  }

  getSelectedTime(selected: string): boolean {
    const dateInstance = this.isStartOpen
      ? this.startTimeControl?.value || this.timeForm?.get('startTime')?.value
      : this.isEndOpen
      ? this.endTimeControl?.value || this.timeForm?.get('endTime')?.value
      : this.control?.value || this.timeForm?.get('time')?.value;

    if (dateInstance instanceof Date) {
      const hours = this.use24HourFormat
        ? dateInstance.getHours().toString().padStart(2, '0')
        : ((dateInstance.getHours() % 12) || 12).toString().padStart(2, '0');
      const minutes = dateInstance.getMinutes().toString().padStart(2, '0');
      const period = this.use24HourFormat ? '' : dateInstance.getHours() < 12 ? ' AM' : ' PM';
      return selected === `${hours}:${minutes}${period}`;
    }

    return false;
  }

  toggleTimePicker(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this._subscribeToOverlayOpen();
    } else {
      this.overlayClosed.emit(); // Emit overlay closed event
    }
    this.handleDocumentClickListener();
  }

  toggleEndTimePickerEnd(): void {
    this.isStartOpen = this.isStartOpen ? !this.isStartOpen : this.isStartOpen;
    this.isEndOpen = !this.isEndOpen;
    if (this.isEndOpen) {
      this._subscribeToOverlayOpen();
    } else {
      this.overlayClosed.emit(); // Emit overlay closed event
    }
    this.handleDocumentClickListener();
  }

  toggleTimePickerStart(): void {
    this.isStartOpen = !this.isStartOpen;
    this.isEndOpen = this.isEndOpen ? !this.isEndOpen : this.isEndOpen;
    if (this.isStartOpen) {
      this._subscribeToOverlayOpen();
    } else {
      this.overlayClosed.emit(); // Emit overlay closed event
    }
    this.handleDocumentClickListener();
  }

  onTimeSelected(time: string, isEndTime: boolean = false): void {
    const selectedDate = this._getDateWithTime(time); // Convert the selected time to a Date instance

    if (this.range && isEndTime) {
      this.endTimeControl
        ? this.endTimeControl.setValue(selectedDate)
        : this.timeForm.patchValue({ endTime: selectedDate });
      this.isEndOpen = false;
    } else if (this.range) {
      this.startTimeControl
        ? this.startTimeControl.setValue(selectedDate)
        : this.timeForm.patchValue({ startTime: selectedDate });
      this.isStartOpen = false;
      this.isOpen = false;
    } else {
      this.control
        ? this.control.setValue(selectedDate) // Update the FormControl with the Date instance
        : this.timeForm.patchValue({ time: selectedDate });
      this.isOpen = false;
    }

    this.timeSelected.emit(
      this.range
        ? this.startTimeControl?.value || this.endTimeControl?.value
          ? { startTime: this.startTimeControl?.value, endTime: this.endTimeControl?.value }
          : this.timeForm.value
        : selectedDate
    ); // Emit the Date instance or range
    this.overlayClosed.emit(); // Emit overlay closed event after selection
    this.handleDocumentClickListener();
  }

  private _getDateWithTime(time: string): Date {
    const [hoursMinutes, period] = time.split(' ');
    const [hours, minutes] = hoursMinutes.split(':').map(Number);
    const date = new Date();
    if (this.use24HourFormat) {
      date.setHours(hours);
    } else {
      date.setHours(period === 'PM' && hours !== 12 ? hours + 12 : hours === 12 && period === 'AM' ? 0 : hours);
    }
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  }

  applyTimeRange(): void {
    if (this.timeForm.valid || (this.startTimeControl?.valid && this.endTimeControl?.valid)) {
      let range = {
        startTime: '',
        endTime: ''
      }

      if ((this.startTimeControl?.value && this.endTimeControl?.value)) {
        range = {
          startTime: this.startTimeControl?.value,
          endTime: this.endTimeControl?.value
        }
      }
      else {
        range = {
          startTime: this.timeForm.value.startTime,
          endTime: this.timeForm.value.endTime
        }
      }

      this.timeChange.emit(range);
    }
  }

  onBlurEvent(): void {
    this.onBlur.emit(); // Emit blur event when input loses focus
  }

  private handleDocumentClickListener(): void {
    const isAnyOpen = this.isOpen || this.isEndOpen || this.isStartOpen;

    if (isAnyOpen && !this.documentClickListener) {
      this.documentClickListener = this.renderer.listen('document', 'click', (event: MouseEvent) => {
        if (!this.elRef.nativeElement.contains(event.target)) {
          this.isOpen = false;
          this.isEndOpen = false;
          this.isStartOpen = false;
          this.overlayClosed.emit(); // Emit overlay closed event
          this.handleDocumentClickListener();
        }
      });

    } else if (!isAnyOpen && this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = null;
    }
  }
}
