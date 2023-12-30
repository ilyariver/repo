import { Component, OnInit } from '@angular/core';
import { ToDoListService } from '../../services/to-do-list.service';
import { GetParams, ToDo } from '../../services/to-do-list-get.model';
import { MessageService } from 'primeng/api';
import { ParamsToArray } from '../../services/params-to-array';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
  providers: [MessageService]
})
export class ToDoListComponent implements OnInit {
  public tasks: Array<ToDo> = [];
  public totalTaskCount: number;
  private sortString = [];
  private arrayPageParams = [];
  public first = 0;
  public countId = 1;
  public rows = 3;
  public visible = false;
  private subscription: Subscription;

  constructor(
    private toDoListService: ToDoListService,
    private paramsToArray: ParamsToArray,
  ) {
    toDoListService.products$.subscribe(res => {
      this.tasks.push(res)
    })
  }

  ngOnInit() {
    this.getData(this.paramsToArray.makeParamsAnArray({page: 1}));
  }

  public sortParam(sort: GetParams) {
    const arraySortParams = this.paramsToArray.makeParamsAnArray(sort);

    this.getData([...arraySortParams, ...this.arrayPageParams])
    this.sortString = arraySortParams;
  }

  public onPageChange(event: any) {
    this.arrayPageParams = this.paramsToArray.makeParamsAnArray({page: event.page + 1});
    const allParams = [...this.arrayPageParams, ...this.sortString]
    this.getData(allParams)
  }

  public addNewTask() {
    this.toDoListService.setProductsMock({
      id: -this.countId++,
      username: '',
      email: '',
      text: '',
      status: false,
    })
  }

  public removeTask(taskId: number) {
    debugger
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }

  private getData(params: any) {
    this.subscription = this.toDoListService.getTasks(params)
      .subscribe(res => {
        this.tasks = res.tasks;
        this.totalTaskCount = +res.total_task_count;
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
