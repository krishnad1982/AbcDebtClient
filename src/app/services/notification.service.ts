import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  message = [];
  constructor() { }

  error = (reasonPhrase: string) => {
    this.message.push(reasonPhrase);
  }
}
