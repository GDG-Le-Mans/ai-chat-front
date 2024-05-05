import { Directive, ElementRef, effect, inject, input } from '@angular/core';
import { marked } from 'marked';
import markedCodePreview from 'marked-code-preview';
import markedCodeFormat from 'marked-code-format';
import prism from 'prismjs';

import 'prismjs';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/show-language/prism-show-language';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-visual-basic';
import 'prismjs/components/prism-xml-doc';


@Directive({
  selector: '[appMarkdown]',
  standalone: true
})
export class MarkdownDirective {

  text = input.required<string>({
    alias: 'appMarkdown',
  });

  private el = inject(ElementRef);

  constructor() {
    effect(async () => {
      this.el.nativeElement.innerHTML = 
          await marked
            .use(markedCodePreview())
            .use(markedCodeFormat())
          .parse(this.text());
      prism.highlightAll();

      this.el.nativeElement.scrollIntoView({ behavior:'smooth', block: 'end' });
    });
  }
}
