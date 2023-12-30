import { Injectable } from '@angular/core';
import { LoginMessage, ToDoListLoginModel } from '../to-do-list/services/to-do-list-get.model';
import { catchError, map, Observable, of, Subject, tap } from 'rxjs';
import { BaseHttpService } from '../classes/http/http-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private token: string = null;
  public isAuthenticatedSubject$ = new Subject();

  constructor(
    private http: BaseHttpService,
  ) { }

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  get currentAuthValue() {
    return this.isAuthenticatedSubject$;
  }

  login(body: LoginMessage): Observable<ToDoListLoginModel> {
    const form = new FormData();
    form.set('username', body.username);
    form.set('password', body.password);

    return this.http.post('login?developer=Ilya', form).pipe(
      tap(({ message }) => {
        debugger
        if (!message.token) {
          return;
        }
        localStorage.setItem('auth-token', message.token);
        this.setToken(message.token);
        this.isAuthenticatedSubject$.next(message.token);
      }),
      catchError((e: any) => {
        return of(e);
      }),
      map(x => x)
    )
  }

  logout() {
    this.setToken(null);
    localStorage.clear();
    this.isAuthenticatedSubject$.next(null);
  }
}
