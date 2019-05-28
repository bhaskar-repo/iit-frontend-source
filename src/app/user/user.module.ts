import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CustomMaterialCompModule } from '../materialComp';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { TermsDialog } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [SignUpComponent, LoginComponent, TermsDialog, ResetPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialCompModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: 'api/v1/users/signup', component: SignUpComponent },
      { path: 'api/v1/users/reset', component: ResetPasswordComponent }
    ])
  ],
  entryComponents: [TermsDialog],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
]
})
export class UserModule { }
