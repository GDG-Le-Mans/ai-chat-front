import { ChangeDetectionStrategy, Component, effect } from '@angular/core';
import { ChatBoxComponent } from '../chat-box/chat-box.component';
import { NavComponent } from '../nav/nav.component';
import { ChatComponent } from '../chat/chat.component';
import { GroqService } from '../groq/groq.service';

@Component({
  selector: 'app-chat-bot',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ChatBoxComponent, NavComponent, ChatComponent],
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.css'
})
export class ChatBotComponent {
  
  constructor(private groqService: GroqService) {}

  get messages() {
    return this.groqService.messages();
  }

  async sendMessage(message: string) {
    await this.groqService.sendMessage(message);
  }
}
