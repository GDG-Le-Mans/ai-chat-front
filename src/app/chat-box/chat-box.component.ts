import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [MatIconModule, ReactiveFormsModule],
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.css'
})
export class ChatBoxComponent {

  formGroup = new FormGroup({
    message: new FormControl('', [Validators.required])
  });

  @Output()
  send: EventEmitter<string> = new EventEmitter<string>();

  sendMessage() {
    if (this.formGroup.get("message")?.value?.trim().length === 0) {
      return;
    }
    this.send.emit(this.formGroup.get("message")?.value ?? "");
    this.formGroup.get("message")?.reset();
  }

  submitEnter(e: Event) {
    e.preventDefault();
    if (!this.formGroup.get('message')?.value?.trim()){
      return;
    }
    this.sendMessage();
  }
  
  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && event.altKey) {
      if (!this.formGroup.get('message')?.value?.trim()) return;
      event.preventDefault();
      let textarea: HTMLTextAreaElement = event.target as HTMLTextAreaElement;
      textarea.value = textarea.value + '\r\n';
    }
  }
  
  isInvalidValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const nullOrWhitespace: boolean =
        (control.value ?? '').trim().length === 0;
      return nullOrWhitespace ? { isInvalid: true } : null;
    };
  }
}
