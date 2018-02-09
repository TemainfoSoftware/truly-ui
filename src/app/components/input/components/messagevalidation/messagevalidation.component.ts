import { Component } from '@angular/core';
import { TlInput } from '../../input';

@Component({
  selector: 'tl-messagevalidation',
  templateUrl: './messagevalidation.component.html',
  styleUrls: ['./messagevalidation.component.scss'],
})
export class TlMessageValidationComponent {

  public messages = [];

  public width;

  public hide;

  public top;

  public left;

  constructor() { }

  hideMessages(value) {
    this.hide = value;
  }

  setInput(tlinput: TlInput) {
    this.top = tlinput.input.nativeElement.getBoundingClientRect().top + tlinput.input.nativeElement.offsetHeight + 'px';
    this.width = tlinput.input.nativeElement.offsetWidth + 'px';
    this.left = parseInt(tlinput.labelSize, 10) + 'px';
  }

  setMessages(messages: Object) {
    this.messages = [];
    if (messages) {
      Object.keys(messages).forEach((key, index, array) => {
        if (key === 'required') {
          this.messages.push('Field Required, please enter a value.');
          return;
        }
        if (key === 'minlength') {
          this.messages.push('Value must have ' + messages['minlength']['requiredLength'] + ' characters.');
          return;
        }
        if (key === 'pattern') {
          this.messages.push('Value does not match required pattern.');
          return;
        }
        this.messages.push(messages[key]);
      });
    }
  }
}
