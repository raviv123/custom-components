import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'signin-button',
  imports: [CommonModule],
  templateUrl: './signin-button.component.html',
  styleUrl: './signin-button.component.scss'
})
export class SignInButtonComponent {
  @Output() onSignIn = new EventEmitter();
  @Input() cssStyle!: { [klass: string]: string | number };
  @Input() buttonUniqueIdName!: string;

  @Input() iconClass: string = ''; // Accepts FontAwesome, Material Icons, or any icon class
  @Input() label: string = ''

  onClick() {
    this.onSignIn.emit('signin');
  }
}
