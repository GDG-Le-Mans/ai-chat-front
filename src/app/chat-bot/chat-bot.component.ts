import { Component, signal } from '@angular/core';
import { ChatBoxComponent } from '../chat-box/chat-box.component';
import { NavComponent } from '../nav/nav.component';
import { ChatComponent } from '../chat/chat.component';
import { GroqService } from '../groq/groq.service';
import { Message } from '../models/message';

@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [ChatBoxComponent, NavComponent, ChatComponent],
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.css'
})
export class ChatBotComponent {
  messages = signal<Message[]>([]);
  constructor(private groqService: GroqService) { }

  async sendMessage(message: string) {
    this.messages.update(mess => {
      return [...mess, {
        content: message,
        author: "You",
        time: new Date(),
        role: "user"
    }]});
    await this.groqService.sendMessage(this.messages().map(m => ({role: m.role, content: m.content})))
      .then(response => {
      this.messages.update(mess => {
        return [...mess, {
          content: response.choices[0]?.message?.content,
          author: "AIChat",
          time: new Date(),
          role: "assistant"
        }]
      });
    });
  }
}
