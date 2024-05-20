import { Directive, ElementRef, effect, inject, input } from '@angular/core';
import { Marked } from "marked";

import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';


@Directive({
  selector: '[appMarkdown]',
  standalone: true
})
export class MarkdownDirective {

  text = input.required<string>({
    alias: 'appMarkdown',
  });

  private el = inject(ElementRef);

  private marked = new Marked(
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang, info) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      }
    })
  );

  constructor() {
    effect(() => {
      this.el.nativeElement.innerHTML = this.marked.parse(this.text());
      this.el.nativeElement.scrollIntoView();
    });
  }
}
