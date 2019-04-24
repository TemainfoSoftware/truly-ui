import { Component, ElementRef, Input, OnChanges } from '@angular/core';
import { I18nService } from '../../../i18n/i18n.service';
import * as stringFormat from 'string-format';
import { FormControl } from '@angular/forms';
const format = stringFormat;

@Component({
  selector: 'tl-messagevalidation',
  templateUrl: './messagevalidation.component.html',
  styleUrls: ['./messagevalidation.component.scss'],
})
export class TlMessageValidationComponent implements OnChanges {

  @Input() control: FormControl;

  @Input() errors = [];

  @Input() width = '';

  public messages = [];

  constructor( public element: ElementRef, private i18n: I18nService ) { }

  setMessages() {
    this.messages = [];
    if (this.control && this.control.errors) {
      Object.keys(this.control.errors).forEach(( key ) => {
        if (key === 'required') {
          this.messages.push(this.i18n.getLocale().Validators.fieldRequired);
          return;
        }
        if (key === 'minlength') {
          const requiredLength = this.control.errors['minlength']['requiredLength'];
          this.messages.push(format(this.i18n.getLocale().Validators.invalidMinLength, requiredLength));
          return;
        }
        if (key === 'email') {
          this.messages.push(format(this.i18n.getLocale().Validators.invalidEmail));
          return;
        }
        if (key === 'pattern') {
          this.messages.push(this.i18n.getLocale().Validators.patternNotMatch);
          return;
        }
        this.messages.push(this.control.errors[key]);
      });
    }
  }

  ngOnChanges() {
    this.setMessages();
  }

}
