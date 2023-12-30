import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToDoListComponent } from './to-do-list/components/to-do-main/to-do-list.component';
import { ErrorWindowComponent } from './404/404.component';

const routes: Routes = [
  {
    path: '',
    component: ToDoListComponent,
  },
  {
    path: 'authentication',
    loadChildren: () => import('./authentication-page/authentication.module').then(m => m.AuthenticationModule),
  },
  {
    path: '404',
    component: ErrorWindowComponent,
  },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, CommonModule]
})
export class AppRoutingModule { }
