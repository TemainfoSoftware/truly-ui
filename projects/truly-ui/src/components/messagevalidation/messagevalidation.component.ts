import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';
import * as stringFormat from 'string-format';
import { AbstractControl } from '@angular/forms';
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
    cnpj: Function(),
    cpf: Function(),
    email: Function(),
    pattern: Function(),
    invalidPasswordRuleDigits: Function(),
    invalidPasswordRuleUppercase: Function(),
    invalidPasswordRuleSpecial: Function(),
    invalidPasswordRuleLowerCase: Function(),
  };

  constructor( public element: ElementRef, private i18n: I18nService, private changes: ChangeDetectorRef ) { }

  init( formControl: AbstractControl, width: string ) {
    this.control = formControl;
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
        } else {
          this.messages.push( this.control.errors[key] );
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
      cnpj: () => this.messages.push( this.i18n.getLocale().Validators.invalidCNPJ ),
      cpf: () => this.messages.push( this.i18n.getLocale().Validators.invalidCPF ),
      invalidPasswordRuleDigits: () => this.messages.push(this.i18n.getLocale().Validators.invalidPasswordRuleDigits),
      invalidPasswordRuleUppercase: () => this.messages.push(this.i18n.getLocale().Validators.invalidPasswordRuleUppercase),
      invalidPasswordRuleSpecial: () => this.messages.push(this.i18n.getLocale().Validators.invalidPasswordRuleSpecial),
      invalidPasswordRuleLowerCase: () => this.messages.push(this.i18n.getLocale().Validators.invalidPasswordRuleLowerCase),
      email: () => this.messages.push(format(this.i18n.getLocale().Validators.invalidEmail)),
      pattern: () => this.messages.push(this.i18n.getLocale().Validators.patternNotMatch)
    };
  }

}
