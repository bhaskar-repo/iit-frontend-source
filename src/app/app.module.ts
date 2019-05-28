import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import 'hammerjs';
import { UserModule } from './user/user.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component'
import { IssueModule } from './issue/issue.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    UserModule,
    IssueModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      preventDuplicates: true,
    }),
    RouterModule.forRoot([
      { path: 'api/v1/users/login', component: LoginComponent, pathMatch: 'full' },
      { path: '', redirectTo: 'api/v1/users/login', pathMatch: 'full' },
      { path: '*', component: LoginComponent, pathMatch: 'full' },
      { path: '**', component: LoginComponent, pathMatch: 'full' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
