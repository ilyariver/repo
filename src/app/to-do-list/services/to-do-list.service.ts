import {Injectable} from '@angular/core';
import { of, Observable, catchError, map, Subject } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ToDo, ToDoListGetModel, ToDoListPostModel } from './to-do-list-get.model';
import { BaseHttpService } from '../../classes/http/http-service';
import { ToDoStatusEnum } from '../enum/to-do-status.enum';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {
  public products$: Subject<ToDo> = new Subject();

  constructor(
    private http: BaseHttpService,
  ) {}

  setProductsMock(product: ToDo = null) {
    if (product) {
      this.products$.next(product);
    }
  }

  getTasks(getParams: {name: string; value: string}[]): Observable<ToDoListGetModel> {
    let params = new HttpParams()

    for (const param of getParams) {
      params = params.set(param.name, param.value)
    }

    return this.http.get(`?developer=Ilya&${params.toString()}`).pipe(
      catchError((e: any) => {
        return of(e);
      }),
      map(item => {
        return {
          ...item.message,
          tasks: item.message.tasks.map(task => {
            return {
              ...task,
              statusCode: task.status,
              status:
                task.status !== ToDoStatusEnum.NotCompleted &&
                task.status !== ToDoStatusEnum.NotCompletedEdited
            }
          })
        }
      })
    )
  }

  createTask(data: ToDo): Observable<ToDoListPostModel> {
    const form = new FormData();
    form.set('username', data.username);
    form.set('email', data.email);
    form.set('text', data.text);

    return this.http.post('create?developer=Ilya', form).pipe(
      catchError((e: any) => {
        return of(e);
      }),
      map(x => x)
    )
  }

  editTask(data: ToDo, taskId: number): Observable<ToDoListPostModel> {
    const form = new FormData();
    form.set('status', String(data.status));
    form.set('token', data.token);
    form.set('text', data.text);

    return this.http.post(`edit/${taskId}?developer=Ilya`, form).pipe(
      catchError((e: any) => {
        return of(e);
      }),
      map(x => x)
    )
  }
}
