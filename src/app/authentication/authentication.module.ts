import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomInputNumberComponent } from '../components/custom-input-number/custom-input-number.component';
import { ErrorMessageComponent } from '../components/error-message/error-message.component';
import { CustomInputPasswordComponent } from '../components/custom-input-password/custom-input-password.component';




@NgModule({
  declarations: [LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CustomInputNumberComponent,
    CustomInputPasswordComponent,
    ErrorMessageComponent
  ],
  exports : [LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent]
})
export class AuthenticationModule { }
