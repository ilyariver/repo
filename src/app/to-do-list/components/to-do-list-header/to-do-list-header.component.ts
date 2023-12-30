import { Component, EventEmitter, Output } from '@angular/core';
import { GetParams } from '../../services/to-do-list-get.model';

interface Title {
  id: number;
  name: string;
  field: string;
  sort: boolean;
}

@Component({
  selector: 'app-to-do-list-header',
  templateUrl: './to-do-list-header.component.html',
  styleUrls: ['./to-do-list-header.component.scss']
})
export class ToDoListHeaderComponent {
  @Output() sortParam = new EventEmitter<GetParams | {}>();

  private _title: Title[];
  public iconName: 'pi pi-sort-alt' | 'pi pi-sort-amount-down' | 'pi pi-sort-amount-up' = 'pi pi-sort-alt';
  public id: number;

  constructor() {
    this.setTitles();
  }

  setTitles(): void {
    this._title = [
      {id: 1, name: 'Имя', field: 'username', sort: true},
      {id: 2, name: 'Email', field: 'email', sort: true},
      {id: 3, name: 'Текст задачи', field: '', sort: false},
      {id: 4, name: 'Статус', field: '', sort: false},
    ]
  }

  get titles(): Title[] {
    return this._title;
  }

  public changeState(id: number) {
    const field = this.titles.find(title => title.id === id).field
    this.id = id;


    switch (this.iconName) {
      case 'pi pi-sort-alt':
        this.iconName = 'pi pi-sort-amount-down';
        this.sortParam.emit({sort_field: field, sort_direction: 'asc'});
        return;
      case 'pi pi-sort-amount-down':
        this.iconName = 'pi pi-sort-amount-up';
        this.sortParam.emit({sort_field: field, sort_direction: 'desc'});
        return;
      case 'pi pi-sort-amount-up':
        this.iconName = 'pi pi-sort-alt'
        this.sortParam.emit({});
        return;
    }

  }
}
