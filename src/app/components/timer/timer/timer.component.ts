import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule, NgTemplateOutlet],
  template: `
    <ng-container 
      *ngTemplateOutlet="messageTemplate; context: { 
        remainingTime: timeLeft, 
        formattedTime: formattedTime, 
        reset: resetTimer.bind(this) 
      }">
    </ng-container>
  `,
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() duration: number = 30;
  @Output() timerEnd = new EventEmitter<void>();

  @ContentChild(TemplateRef, { static: false }) messageTemplate!: TemplateRef<any>;

  timeLeft!: number;
  private intervalId: any;

  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  private startTimer() {
    this.clearTimer();
    this.timeLeft = this.duration;
    this.intervalId = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.clearTimer();
        this.timerEnd.emit();
      }
    }, 1000);
  }

  resetTimer() {
    this.startTimer();
  }

  private clearTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  get formattedTime(): string {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}
