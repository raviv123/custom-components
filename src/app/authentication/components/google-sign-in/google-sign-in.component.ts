import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-google-sign-in',
  imports: [CommonModule],
  templateUrl: './google-sign-in.component.html',
  styleUrl: './google-sign-in.component.scss'
})
export class GoogleSignInComponent {
  @Output() onSignIn = new EventEmitter();
  @Input() cssStyle!: { [klass: string]: string | number };
  @Input() buttonUniqueIdName!: string;

  @Input() iconClass: string = ''; // Accepts FontAwesome, Material Icons, or any icon class
  @Input() label: string = ''

  onClick() {
    this.onSignIn.emit('signin');
  }
}
