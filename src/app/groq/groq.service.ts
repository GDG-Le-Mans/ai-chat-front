import { Injectable } from '@angular/core';
import Groq from 'groq-sdk';

@Injectable({
  providedIn: 'root'
})
export class GroqService {

  private groqToken = '';
  private groq: Groq = new Groq({apiKey: this.groqToken, dangerouslyAllowBrowser: true});

  constructor() { }

  sendMessage(history: {role: string, content: string}[] = []) {
    return this.groq.chat.completions.create({
      messages: history,
      model: "llama3-70b-8192"
  });
  }
}
