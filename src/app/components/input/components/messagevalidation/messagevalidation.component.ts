import { Component, ElementRef } from '@angular/core';
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

  public left;

  constructor( public element: ElementRef ) { }

  hideMessages(value) {
    this.hide = value;
  }

  setInput(tlinput: TlInput) {
    this.left  = (tlinput.label && tlinput.labelPlacement === 'left') ? parseInt(tlinput.labelSize, 10) + 'px' : 0;
    this.width = (tlinput.inputBox.nativeElement.offsetWidth - parseInt(this.left, 10)) + 'px';
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
