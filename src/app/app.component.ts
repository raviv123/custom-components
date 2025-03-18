import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthenticationModule } from './authentication/authentication.module';
import { SignInButtonComponent } from './authentication/components/signin-button/signin-button.component';
import { auth } from './authentication/services/gAuth.service';
import { CustomInputNumberComponent } from './components/custom-input-number/custom-input-number.component';
import { CustomInputPasswordComponent } from './components/custom-input-password/custom-input-password.component';
import { CustomValidators } from './custom.validator';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { MicrosoftAuthService } from './authentication/services/microsoft-auth.service'; // Import MicrosoftAuthService
import { CommonModule } from '@angular/common';
import { MatdatepickerComponent } from './components/matdatepicker/matdatepicker.component';

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
    AuthenticationModule,
    FontAwesomeModule,
    CommonModule,
    RouterModule,
    MatdatepickerComponent, // Add AppDatepickerComponent to imports
  ], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  clientId : string = '418577154106-7qmn5bc0itvtt29tci0t1l6t7vnutp9a.apps.googleusercontent.com'
  showLogoutButton : boolean = false;
  constructor(
    private auth: auth,
    private route: ActivatedRoute,
    private microsoftAuthService: MicrosoftAuthService, // Inject MicrosoftAuthService
    private router: Router // Inject Router
  ) {
    this.auth.getTokensFromParams();
    this.auth.profile$.subscribe((profile) => {
      this.auth.revokeToken(this.auth.userInfo.accessToken as string);
    });

    this.route.queryParams.subscribe(params => {
      const authCode = params['code'];
      if (authCode) {
        this.microsoftAuthService.exchangeCodeForToken(authCode).subscribe(
          (response: any) => {
            this.showLogoutButton = true;
            this.microsoftAuthService.getUserProfile(response.access_token).subscribe(  
              (userInfo: any) => {
                // this.microsoftAuthService.logout();
                console.log('User Info:', userInfo);
                this.router.navigateByUrl('/dashboard'); // Redirect to the dashboard
              }
            );  
          },
          error => console.error('Token exchange failed:', error)
        );
      }
    });
  }


  googleButtonElement: string = 'google-login-button';
  microsoftButtonElement: string = 'microsoft-login-button';  


  errorMessages: { [key: string]: string } = errorMessages;

  form = new FormGroup({
    // dob: new FormControl('', [
    //   Validators.required
    // ]),
    startControl: new FormControl('', [
      Validators.required
    ]),
    endControl: new FormControl('', [
      Validators.required
    ]),
  }); 

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      console.log('Form is invalid');
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
  }

  onMicrosoftSignIn() {
    this.microsoftAuthService.microSignIn();
  }

  handleResponse = (googleResponse: any) => {
    debugger
  }

  onLogoutClick() {
    this.showLogoutButton = !this.showLogoutButton;
    this.microsoftAuthService.logout();
  }
}
