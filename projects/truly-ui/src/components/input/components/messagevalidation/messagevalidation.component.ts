import { Component, ElementRef } from '@angular/core';
import { I18nService } from '../../../i18n/i18n.service';
import { TlInput } from '../../input';
import * as stringFormat from 'string-format';
const format = stringFormat;

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

  constructor( public element: ElementRef, private i18n: I18nService ) { }

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
      Object.keys(messages).forEach(( key ) => {
        if (key === 'required') {
          this.messages.push(this.i18n.getLocale().Validators.fieldRequired);
          return;
        }
        if (key === 'minlength') {
          const requiredLength = messages['minlength']['requiredLength'];
          this.messages.push(format(this.i18n.getLocale().Validators.invalidMinLength, requiredLength));
          return;
        }
        if (key === 'pattern') {
          console.log(messages);
          this.messages.push(this.i18n.getLocale().Validators.patternNotMatch);
          return;
        }
        this.messages.push(messages[key]);
      });
    }
  }
}
