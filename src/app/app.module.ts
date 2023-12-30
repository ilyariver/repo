import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { MainComponent } from './core/main/main.component';
import { ToDoListComponent } from './to-do-list/components/to-do-main/to-do-list.component';
import { ToDoListHeaderComponent } from './to-do-list/components/to-do-list-header/to-do-list-header.component';
import { ToDoItemComponent } from './to-do-list/components/to-do-item/to-do-item.component';
import { ErrorWindowComponent } from './404/404.component';
import { AuthInterceptor } from './_helpers/auth-interceptor.service';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import {
  AuthenticationPageComponent
} from './authentication-page/components/authentication-main/authentication-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    ToDoListComponent,
    ToDoItemComponent,
    ToDoListHeaderComponent,
    ToDoItemComponent,
    AuthenticationPageComponent,
    ErrorWindowComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ButtonModule,
    InputTextareaModule,
    CheckboxModule,
    InputTextModule,
    AppRoutingModule,
    ReactiveFormsModule,
    PaginatorModule,
    ButtonModule,
    DialogModule,
    ToastModule,
    ProgressSpinnerModule,
    PasswordModule,
    AvatarModule,
  ],
  providers: [
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthInterceptor,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
