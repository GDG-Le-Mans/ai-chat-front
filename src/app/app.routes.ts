import { Routes } from '@angular/router';
import { ChatBotComponent } from './chat-bot/chat-bot.component';

export const routes: Routes = [
    { path: '', redirectTo: 'chat-bot', pathMatch: 'full' },
    { path: 'chat-bot', component: ChatBotComponent },
    { path: '**', redirectTo: 'chat-bot', pathMatch: 'full' }
];
