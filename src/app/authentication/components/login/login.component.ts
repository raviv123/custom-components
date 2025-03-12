import { Component, ContentChild, Input, Output, TemplateRef, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { auth } from '../../services/dits-authentication.service';


@Component({
  selector: 'app-login',
  // imports: [],
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @Input() form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  
  @Input() fields: { name: string; type: string; placeholder: string }[] = [];
  @ContentChild('headerTemplate') headerTemplate!: TemplateRef<any>;
  @ContentChild('bodyTemplate') bodyTemplate!: TemplateRef<any>;
  @ContentChild('footerTemplate') footerTemplate!: TemplateRef<any>;

  @Output() onSubmit = new EventEmitter<any>();


  constructor(private auth: auth) {
  }

  getFormControl(controlName: string): FormControl {
    return this.form.get(controlName) as FormControl;
  }

  onSubmitClick() {
    this.onSubmit.emit(this.form.value)
    // console.log(this.loginForm.value);
  }
}