import { Component, DoCheck, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ToDo } from '../../services/to-do-list-get.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToDoListService } from '../../services/to-do-list.service';
import { TaskState } from '../../services/to-do-list';
import { ToastrService } from '../../../_helpers/toastr.service';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item.component.html',
  styleUrls: ['./to-do-item.component.scss'],
  providers: [ToastrService],
})
export class ToDoItemComponent implements OnInit, DoCheck, OnDestroy {
  @Output() removeTask: EventEmitter<number> = new EventEmitter<number>();
  @Input() task = {} as ToDo;
  public cloneTask: string;
  public creatable = false;
  private stateTask: {
    isAdmin: boolean,
    state: TaskState,
  }
  public form: FormGroup;
  public checked = false;
  public submit = false;
  public ifAdmin = false;
  public taskEdit = false;
  public saveTaskDisabled = true;
  private subscription: Subscription;
  private NEW_TASK_ID = -1;

  constructor(
    private fb: FormBuilder,
    private toDoListService: ToDoListService,
    private auth: AuthenticationService,
    private toastr: ToastrService,
  ) {
    this.auth.currentAuthValue.subscribe(
      () => {
        this.ifAdmin = this.auth.isAuthenticated();
        this.setStateTask(this.ifAdmin);
      }
    )
  }

  ngOnInit() {
    this.ifAdmin = this.auth.isAuthenticated();
    this.setFormGroup();
    this.setStateTask(this.ifAdmin);
    this.cloneData();
    if (this.ifAdmin) {
      this.taskEdit = true;
    }
  }

  ngDoCheck() {
    this.form.updateValueAndValidity();
    this.getAccessToFields();
  }

  public changeInput() {
    this.saveTaskDisabled = this.cloneTask === JSON.stringify(this.form.value);
  }

  private setFormGroup() {
    this.getAccessToFields();
    this.form = this.fb.group({
      username: [{ value: this.task.username, disabled: !this.getAccessToFields().create }, Validators.required],
      email: [{ value: this.task.email, disabled: !this.getAccessToFields().create }, Validators.required],
      text: [{ value: this.task.text, disabled: !this.getAccessToFields().create }, Validators.required],
      status: [{ value: this.task.status, disabled: !this.getAccessToFields().adminEdit }],
    })

    if (this.getAccessToFields().adminEdit) {
      this.form.get('text').enable()
    }
  }

  public editTask(taskId: number) {
    if (taskId === this.task.id) {
      this.setFormGroup();
    }
  }

  private setStateTask( isAdmin: boolean = false, state: TaskState = 'viewing') {
    if (Math.sign(this.task.id) === this.NEW_TASK_ID) {
      state = 'create'
    }
    this.stateTask = { ...this.stateTask, state, isAdmin };
  }

  public get checkEmail() {
    return this.form.get('email').hasError('required') ||
           this.form.get('email').hasError('email')
  }

  private checkValidateMail() {
    if (this.checkEmail) {
      this.toastr.set('Неккоректный email', 'error');
    }
  }

  private showMoreErrors(res: any) {
    for (const key of Object.keys(res.message)) {
      debugger
      this.toastr.set(res.message[key], 'error');
    }
  }

  private get invalid(): boolean {
    this.submit = true;
    if (!this.form.valid) {
      this.checkValidateMail();
      this.toastr.set('Проверьте заполненность полей', 'error');
      return true;
    }
  }

  private disableInputs() {
    this.form.get('username').disable();
    this.form.get('email').disable();
    this.form.get('text').disable();
  }


  public removeCreatedTask(taskId: number) {
    this.removeTask.emit(taskId);
  }

  public createTask() {
    const params = this.form.value;
    this.toastr.clear();

    if (this.invalid) {
      return;
    }

    this.subscription = this.toDoListService.createTask(params)
      .subscribe(res => {
        if (res.status === 'error') {
          this.showMoreErrors(res);
        } else {
          this.submit = false;
          this.creatable = false;
          this.task.email = res.message.email;
          this.task.status = res.message.status;
          this.task.text = res.message.text;
          this.task.username = res.message.username;
          this.toastr.set('Задача успешно сохранена', 'success');
          this.disableInputs();
        }
      })
  }


  public saveTask(taskId: number) {
    if (this.invalid || !this.getAccessToFields().adminEdit) {
      return;
    }

    if (taskId === this.task.id) {
      this.toDoListService.editTask({ ...this.form.value, token: this.auth.getToken() }, taskId)
        .subscribe(res => {
          if (res.status === 'ok') {
            this.toastr.set('Задача изменена успешно', 'success');
            this.disableInputs();
          } else {
            this.toastr.set('Задача не сохранилась, что-то пошло не так', 'error');
          }
        })
    }
  }

  private cloneData() {
    const { username, email, text, status } = this.task;
    let task: ToDo;
    if (this.getAccessToFields().create) {
      task = { username, email, text };
    }
    if (this.getAccessToFields().adminEdit) {
      task = { username, email, text, status };
    }
    this.cloneTask = JSON.stringify(task);
  }

  public getAccessToFields() {
    return {
      adminEdit: this.ifAdmin && this.taskEdit,
      create: Math.sign(this.task.id) === this.NEW_TASK_ID,
    }
  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
