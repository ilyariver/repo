import { NgModule } from '@angular/core';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [ CommonModule, AuthenticationRoutingModule ]
})
export class AuthenticationModule {}
