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

import { CustomType } from '../../core/custom-type';
import { CreditCard } from './creditcard.validator';
import * as cards from './creditcards';

const creditCard = 0;

export class CreditCardFactory {

  static getInstance( tlinput ): CustomType {
    // this.setMIICreditCardLogo( tlinput );
    this.setCreditCardMask( tlinput );
    return new CreditCard(creditCard);
  }

  static setCreditCardMask( tlinput ) {
    tlinput.mask = '9999.9999.9999.9999';
  }

  /* static setMIICreditCardLogo( tlinput ) {
    if ( tlinput.input.nativeElement.value.length >= 2 ) {
      const digits = this.creditNumberUnmasked( tlinput.input.nativeElement.value ).substr( 0, 2 );
      Object.values( cards.list ).forEach( ( item, index, array ) => {
        if ( item.id.includes( digits ) ) {
          creditCard = item;
        }
      } );
    }
  } */

  static creditNumberUnmasked( value ) {
    return String( value ).replace( /(\/|\.|-|_|\(|\)|:|\+)/gi, '' );
  }

}

