import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthenticationModule } from './authentication/authentication.module';
import { GoogleSignInComponent } from './authentication/components/google-sign-in/google-sign-in.component';
import { auth } from './authentication/services/dits-authentication.service';
import { CustomInputNumberComponent } from './components/custom-input-number/custom-input-number.component';
import { CustomInputPasswordComponent } from './components/custom-input-password/custom-input-password.component';
import { CustomValidators } from './custom.validator';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';

interface AuthParams {
  client_id: string;
  prompt: string;
  redirect_uri: string;
  response_type: string;
  scope: string;
  nonce: string;
}

const errorMessages = {
  required: 'This is required',
  minlength: 'Please enter atlease 3 letters.',
  pattern: 'pattren is not correct',
  maxlength: 'maxlengh should be 10',
};

declare var google: any;

@Component({
  selector: 'app-root',
  imports: [
    ReactiveFormsModule,
    CustomInputNumberComponent,
    CustomInputPasswordComponent,
    AuthenticationModule,
    GoogleSignInComponent,
    FontAwesomeModule,
    HttpClientModule,

  ], //
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  clientId : string = '418577154106-7qmn5bc0itvtt29tci0t1l6t7vnutp9a.apps.googleusercontent.com'

  constructor(private auth: auth,
    private route: ActivatedRoute
  ) {
    this.auth.getTokensFromParams();
    this.auth.profile$.subscribe((profile) => {
      this.auth.revokeToken(this.auth.userInfo.accessToken as string)
      console.log(profile)
    })
  }


  googleButtonElement: string = 'google-login-button';


  errorMessages: { [key: string]: string } = errorMessages;

  //   userForm: FormGroup = new FormGroup({
  //     phone: new FormControl('', [Validators.required, Validators.minLength(3),Validators.pattern('^[a-zA-Z]+$'),Validators.maxLength(10)])
  //   });

  //   title = 'dummyProject';
  // }

  form = new FormGroup({
    number: new FormControl('', [
      Validators.required
    ]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    // confirmPassword: new FormControl('', [
    //   Validators.required,
    // ]),
    // dob: new FormControl('', [
    //   Validators.required, dateRangeValidator(new Date('03-01-2025'), new Date('03-10-2025')) //minDateValidator(new Date('2025-03-06')),maxDateValidator(new Date('2025-03-10')
    // ]),
  }); //,passwordMatchValidator()

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.form.reset();
    }
  }

  onGoogleSignIn() {


    const authConfig = {
      client_id: this.clientId,
      prompt: 'select_account',
      response_type: 'id_token token',
      scope: 'profile email',
    };


    this.auth.handleLogin(authConfig);
//     let element = document.getElementById(this.googleButtonElement);
//     setTimeout(() => {
//       // google.accounts.id.renderButton(element)
//     });





  //   google.accounts.id.renderButton(
  //     document.getElementById('googleSignIn'),
  //     { theme: 'outline', size: 'large' }
  //   );
  // }, 1000);


    // this.DitsAuthenticationService.authenticate(element,this.handleResponse)
  }

  handleResponse = (googleResponse: any) => {
    debugger
  }
}
