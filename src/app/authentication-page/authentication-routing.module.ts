import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationPageComponent } from './components/authentication-main/authentication-page.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationPageComponent,
  }
]

@NgModule({
  imports: [ CommonModule, RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AuthenticationRoutingModule {}
