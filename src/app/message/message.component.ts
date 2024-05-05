import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownDirective } from '../directives/markdown.directive';
import { Message } from '../models/message';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [MatIconModule, MarkdownDirective],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  @Input() message!: Message;
}
