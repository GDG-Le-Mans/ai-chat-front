import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Message } from '../models/message';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroqService {
  history = signal<Message[]>([]);
  currentMessage = signal<Message>({
    content: "",
    author: "AIChat",
    time: new Date(),
    role: "assistant"
  })
  messages = computed(() => [...this.history(), this.currentMessage()]);

  constructor(private readonly httpClient: HttpClient) {
    const eventSource = new EventSource(`${environment.server}/sse`);
    eventSource.addEventListener('message', ({ data }: { data: string} ) => {
      if(data.length === 0) return;
      if(data.endsWith('<|END|>')) {
        if(this.currentMessage().content.length > 0) {
          this.history.update(mess => [...mess, {...this.currentMessage()}]);
          this.currentMessage.set({content: '', time: new Date(), author: "AIChat", role: "assistant"});
        }
      } else {
        this.currentMessage.update(curr => ({...curr, content: curr.content + data}));
      }
    });
  }

  sendMessage(message: string) {
    const postQuery = this.httpClient.post(`${environment.server}/`, {message: {role: "user", content: message}, history: this.history().map(m => ({role: m.role, content: m.content}))});
    this.history.update(mess => {
      return [...mess, {
        content: message,
        author: "You",
        time: new Date(),
        role: "user"
    }]});
    this.currentMessage.set({content: '', time: new Date(), author: "AIChat", role: "assistant"});
    return firstValueFrom(postQuery);
  }
}
