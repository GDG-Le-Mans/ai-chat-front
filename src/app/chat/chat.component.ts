import { Component, Signal, effect, input } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { Message } from '../models/message';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [MessageComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  messages = input<Message[]>([]);

  constructor() {
    effect(() => {
      console.log(this.messages());
    });
  }
}
