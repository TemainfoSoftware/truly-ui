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
import { CustomType } from '../../input/core/custom-type';

/*https://www.freeformatter.com/credit-card-number-generator-validator.html#howToValidate
  https://www.4devs.com.br/validador_numero_cartao_credito
    https://www.tools4noobs.com/online_tools/credit_card_validate/
      https://pt.stackoverflow.com/questions/97234/validar-n%C3%BAmero-cart%C3%A3o-de-cr%C3%A9dito*/

export class CreditCard implements CustomType {

  private creditCard;

  constructor( card ) {
    this.creditCard = card;
  }

  validate(): ValidatorFn {
    return ( control: AbstractControl ) => {
      if ( !this.creditCard ) {
        return { creditcard: 'Invalid Credit Card' };
      }
      const regex = new RegExp( this.creditCard.regex );
      if ( (this.creditNumberUnmasked( control.value ) !== '') &&
        (!regex.test( this.creditNumberUnmasked( control.value ) )) ) {
        return { creditcard: 'Invalid Credit Card' };
      }
      return null;
    };
  }

  creditNumberUnmasked( value ) {
    return String( value ).replace( /(\/|\.|-|_|\(|\)|:|\+)/gi, '' );
  }
}
