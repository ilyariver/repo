import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

// Базовый Сервис - обертка для HttpClient
@Injectable({ providedIn: 'root' })
export class BaseHttpService {
  protected baseUrl = 'https://uxcandy.com/~shapoval/test-task-backend/v2/'; // Базовый путь для всех сервисов

  constructor( private http: HttpClient ) {
  }

  // Базовый метод для получения данных с сервера GET-ом
  get<T>(url: string, headers?: HttpHeaders): Observable<T> {
    url = this.baseUrl + url;
    return this.http.get<T>(url, { headers });
  }

  // Базовый метод для получения данных с сервера POST-ом
  post<T>(url: string, data?: any, headers?: any): Observable<T> {
    url = this.baseUrl + url;
    return this.http.post<T>(url, data, { headers });
  }
}
