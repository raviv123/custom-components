import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, Renderer2, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-timepicker',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './timepicker.component.html',
  styleUrl: './timepicker.component.scss'
})
export class TimepickerComponent implements OnInit, AfterViewInit {
  @Input() initialTime: string = '12:00 PM';
  @Input() range: boolean = true;
  @Input() interval: number = 15; // Interval in minutes, default to 30 minutes
  @Output() timeChange = new EventEmitter<string | { startTime: string, endTime: string }>();

  @ViewChild('timePickerContainer') timePickerContainer!: ElementRef;

  timeForm: FormGroup;
  amTimeOptions: string[] = [];
  pmTimeOptions: string[] = [];
  isOpen: boolean = false;
  isEndOpen: boolean = false;
  isStartOpen: boolean = false;
  private documentClickListener: (() => void) | null = null;

  constructor(
    private fb: FormBuilder,
    private renderer: Renderer2,
    private elRef: ElementRef
  ) {
    this.timeForm = this.fb.group({
      time: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
    this.generateTimeOptions();
  }

  ngAfterViewInit(): void {
    this._subscribeToOverlayOpen();
  }

  ngOnInit(): void {
    if (this.initialTime) {
      this.timeForm.patchValue({ time: this.initialTime });
    }
  }

  private _subscribeToOverlayOpen(): void {
    if (this.isOpen || this.isStartOpen || this.isEndOpen) {
      setTimeout(() => {
        const selectedTime = this.isEndOpen
          ? this.timeForm.get('endTime')?.value
          : this.isStartOpen
          ? this.timeForm.get('startTime')?.value
          : this.timeForm.get('time')?.value;

        this.scrollToSelectedOption(selectedTime);
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
    this.amTimeOptions = [];
    this.pmTimeOptions = [];
    for (let hour = 1; hour <= 12; hour++) {
      for (let minute = 0; minute < 60; minute += this.interval) {
        const formattedMinute = minute < 10 ? `0${minute}` : `${minute}`;
        this.amTimeOptions.push(`${hour}:${formattedMinute} AM`);
        this.pmTimeOptions.push(`${hour}:${formattedMinute} PM`);
      }
    }
  }

  toggleTimePicker(): void {
    this.isOpen = !this.isOpen;
    this._subscribeToOverlayOpen();
    this.handleDocumentClickListener();
  }

  toggleEndTimePickerEnd(): void {
    this.isStartOpen = this.isStartOpen ? !this.isStartOpen : this.isStartOpen;
    this.isEndOpen = !this.isEndOpen;
    this._subscribeToOverlayOpen();
    this.handleDocumentClickListener();
  }

  toggleTimePickerStart(): void {
    this.isStartOpen = !this.isStartOpen;
    this.isEndOpen = this.isEndOpen ? !this.isEndOpen : this.isEndOpen;
    this._subscribeToOverlayOpen();
    this.handleDocumentClickListener();
  }

  onTimeSelected(time: string, isEndTime: boolean = false): void {
    if (this.range && isEndTime) {
      this.timeForm.patchValue({ endTime: time });
      this.isEndOpen = false;
    } else if (this.range) {
      this.timeForm.patchValue({ startTime: time });
      this.isStartOpen = false;
      this.isOpen = false;
    } else {
      this.timeForm.patchValue({ time: time });
      this.timeChange.emit(time);
      this.isOpen = false;
    }
    this.handleDocumentClickListener();
  }

  applyTimeRange(): void {
    if (this.timeForm.valid) {
      const { startTime, endTime } = this.timeForm.value;
      this.timeChange.emit({ startTime, endTime });
    }
  }

  private handleDocumentClickListener(): void {
    const isAnyOpen = this.isOpen || this.isEndOpen || this.isStartOpen;

    if (isAnyOpen && !this.documentClickListener) {
      this.documentClickListener = this.renderer.listen('document', 'click', (event: MouseEvent) => {
        if (!this.elRef.nativeElement.contains(event.target)) {
          this.isOpen = false;
          this.isEndOpen = false;
          this.isStartOpen = false;
          this.handleDocumentClickListener();
        }
      });

    } else if (!isAnyOpen && this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = null;
    }
  }
}
