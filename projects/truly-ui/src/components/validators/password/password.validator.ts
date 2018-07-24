/*
 MIT License

 Copyright (c) 2018 Temainfo Software

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ValidatorsI18nInterface } from '../../i18n/languages/validators';
import { CustomType } from '../../input/core/custom-type';

export class Password implements CustomType {

  private passwordRule;

  private regex: RegExp;

  private i18n: ValidatorsI18nInterface;

  constructor( passwordRule, i18n: ValidatorsI18nInterface ) {
    this.passwordRule = passwordRule;
    this.i18n = i18n;
  }

  validate(): ValidatorFn {
    return ( control: AbstractControl ) => {

      const digits = '^(?=.*[0-9]).*$';
      const uppercase = '^(?=.*[A-Z]).*$';
      const special = '^(?=.*[!@#$%^&*]).*$';

      if ( this.passwordRule['digits'] ) {
        this.regex = new RegExp( digits );
        if (!this.regex.test(control.value)) {
          return { password: this.i18n.invalidPasswordRuleDigits };
        }
      }

      if (this.passwordRule['uppercase']) {
        this.regex = new RegExp( uppercase );
        if (!this.regex.test(control.value)) {
          return { password: this.i18n.invalidPasswordRuleUppercase };
        }
      }

      if (this.passwordRule['special']) {
        this.regex = new RegExp( special );
        if (!this.regex.test(control.value)) {
          return { password: this.i18n.invalidPasswordRuleSpecial };
        }
      }

      return null;

    };
  }

}
