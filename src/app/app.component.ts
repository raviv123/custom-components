import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomCheckboxComponent } from './components/custom-checkbox/custom-checkbox/custom-checkbox.component';

const errorMessages = {
  required: 'This is required',
  minlength: 'Please enter atlease 3 letters.',
  pattern: 'pattren is not correct',
  maxlength: 'maxlengh should be 10',
};

@Component({
  selector: 'app-root',
  imports: [
    ReactiveFormsModule,
    // CustomInputNumberComponent,
    // CustomInputPasswordComponent,
    CustomCheckboxComponent,
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent  {
  errorMessages: { [key: string]: string } = errorMessages;

  //   userForm: FormGroup = new FormGroup({
  //     phone: new FormControl('', [Validators.required, Validators.minLength(3),Validators.pattern('^[a-zA-Z]+$'),Validators.maxLength(10)])
  //   });

  //   title = 'dummyProject';
  // }

  // form = new FormGroup(
  //   {
  //     number: new FormControl('', [
  //       Validators.required,
  //       CustomValidators.minMaxLengthValidator(2, 10),
  //     ]),
  //     newPassword: new FormControl('', [
  //       Validators.required,
  //       Validators.minLength(8),
  //       Validators.pattern(
  //         '^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$'
  //       ),
  //     ]),
  //     confirmPassword: new FormControl('', [Validators.required]),
  //   },
  //   {
  //     validators: CustomValidators.fieldsMatchValidator(
  //       'newPassword',
  //       'confirmPassword'
  //     ),
  //   }
  // );

  // submit() {
  //   if (this.form.valid) {
  //     console.log(this.form.value);
  //     this.form.reset();
  //   }
  // }

  // form: FormGroup;
  // checkboxList = [
  //   { key: 'option1', label: 'Option 1' },
  //   { key: 'option2', label: 'Option 2' },
  //   { key: 'option3', label: 'Option 3' }
  // ];

  // constructor() {
  //   this.form = new FormGroup({});
  // }

  // ngOnInit() {
  //   this.checkboxList.forEach(item => {
  //     this.form.addControl(item.key, new FormControl(false)); 
  //   });
  // }

  // submitForm() {
  //   console.log('Selected Values:', this.form.value);
  // }

  form: FormGroup;
  childCheckboxes= [
    { key: 'option1', label: 'Option 1' },
    { key: 'option2', label: 'Option 2' },
    { key: 'option3', label: 'Option 3' }
  ];

  constructor() {
    this.form = new FormGroup({});
  }

  ngOnInit() {
    this.form.addControl('simple', new FormControl(false));
    this.form.addControl('parent-child', new FormControl(false));
  }

  submitForm() {
    console.log(this.form.value);
  }

}

