import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {
  constructor(
    private messageService: MessageService,
  ) { }

  set(message: string, status: 'success' | 'info' | 'warn' | 'error') {
    this.messageService.add({
      severity: status,
      summary: 'Сообщение',
      detail: message
    });
  }

  clear() {
    this.messageService.clear()
  }
}
