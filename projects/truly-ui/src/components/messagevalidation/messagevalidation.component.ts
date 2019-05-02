import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';
import * as stringFormat from 'string-format';
import { FormControlName, NgModel } from '@angular/forms';
const format = stringFormat;

@Component({
  selector: 'tl-messagevalidation',
  templateUrl: './messagevalidation.component.html',
  styleUrls: ['./messagevalidation.component.scss'],
})
export class TlMessageValidationComponent {

  private errors = {};

  public control = null;

  public width = '';

  public messages = [];

  private keyErrors = {
    required: Function(),
    minlength: Function(),
    email: Function(),
    pattern: Function(),
    invalidPasswordRuleDigits: Function(),
    invalidPasswordRuleUppercase: Function(),
    invalidPasswordRuleSpecial: Function(),
    invalidPasswordRuleLowerCase: Function()
  };

  constructor( public element: ElementRef, private i18n: I18nService, private changes: ChangeDetectorRef ) { }

  init( control: NgModel | FormControlName, width: string ) {
    this.control = control;
    this.width = width;
    this.changes.detectChanges();
  }

  setMessages() {
    this.messages = [];
    this.setKeyErrors();
    if (this.control && this.control.errors) {
      Object.keys(this.control.errors).forEach(( key ) => {
        if (this.keyErrors[key]) {
          this.keyErrors[key]();
        }
      });
    }
  }

  setKeyErrors() {
    this.keyErrors = {
      required: () => this.messages.push(this.i18n.getLocale().Validators.fieldRequired),
      minlength: () => {
        const requiredLength = this.control.errors['minlength']['requiredLength'];
        this.messages.push(format(this.i18n.getLocale().Validators.invalidMinLength, requiredLength));
      },
      invalidPasswordRuleDigits: () => this.messages.push(this.i18n.getLocale().Validators.invalidPasswordRuleDigits),
      invalidPasswordRuleUppercase: () => this.messages.push(this.i18n.getLocale().Validators.invalidPasswordRuleUppercase),
      invalidPasswordRuleSpecial: () => this.messages.push(this.i18n.getLocale().Validators.invalidPasswordRuleSpecial),
      invalidPasswordRuleLowerCase: () => this.messages.push(this.i18n.getLocale().Validators.invalidPasswordRuleLowerCase),
      email: () => this.messages.push(format(this.i18n.getLocale().Validators.invalidEmail)),
      pattern: () => this.messages.push(this.i18n.getLocale().Validators.patternNotMatch)
    };
  }

}
