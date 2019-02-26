/*
 MIT License

 Copyright (c) 2019 Temainfo Software

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
import { LOCALE_I18N } from '../../i18n/i18n.service';

/*https://www.freeformatter.com/credit-card-number-generator-validator.html#howToValidate
  https://www.4devs.com.br/validador_numero_cartao_credito
    https://www.tools4noobs.com/online_tools/credit_card_validate/
      https://pt.stackoverflow.com/questions/97234/validar-n%C3%BAmero-cart%C3%A3o-de-cr%C3%A9dito*/

export function  CreditCardValidator( creditCard ): ValidatorFn {
  return ( control: AbstractControl ) => {
    if ( !creditCard ) {
      return { creditcard: LOCALE_I18N.Validators.invalidCreditCard };
    }
    const regex = new RegExp( creditCard.regex );
    if ( ( creditNumberUnmasked( control.value ) !== '') &&
      (!regex.test( creditNumberUnmasked( control.value ) )) ) {
        return { creditcard: LOCALE_I18N.Validators.invalidCreditCard };
      }
    return null;
  };
}

function creditNumberUnmasked( value ) {
  return String( value ).replace( /(\/|\.|-|_|\(|\)|:|\+)/gi, '' );
}

