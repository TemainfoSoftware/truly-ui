/*
 MIT License

 Copyright (c) 2018 Temainfo Sistemas

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
import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CNPJ implements CustomType {

  validate(): ValidatorFn {
    return ( c: AbstractControl ) => {

      if ( (this.cnpjUnmasked( c ) === null) || (this.cnpjUnmasked( c ).length < 14) ) {
        return { cnpj: 'Invalid CNPJ' };
      }

      if ( this.isAllCharacteresEquals( c ) ) {
        return { cnpj: 'Invalid CNPJ' };
      }

      let size: any = this.cnpjUnmasked( c ).length - 2;
      let numbers: any = this.cnpjUnmasked( c ).substring( 0, size );
      const digits: any = this.cnpjUnmasked( c ).substring( size );

      let sum = 0;
      let pos = size - 7;
      let result;

      for ( let i = size; i >= 1; i-- ) {
        sum += numbers.charAt( size - i ) * pos--;
        if ( pos < 2 ) {
          pos = 9;
        }
      }
      result = sum % 11 < 2 ? 0 : 11 - sum % 11;
      if ( result !== parseInt( digits.charAt( 0 ), 10 ) ) {
        return { cnpj: 'Invalid CNPJ' };
      }

      size = size + 1;
      numbers = this.cnpjUnmasked( c ).substring( 0, size );
      sum = 0;
      pos = size - 7;
      for ( let i = size; i >= 1; i-- ) {
        sum += numbers.charAt( size - i ) * pos--;
        if ( pos < 2 ) {
          pos = 9;
        }
      }
      result = sum % 11 < 2 ? 0 : 11 - sum % 11;

      if ( result !== parseInt( digits.charAt( 1 ), 10 ) ) {
        return { cnpj: 'Invalid CNPJ' };
      }

      return null;
    };
  }

  cnpjUnmasked( c ) {
    return String( c.value ).replace( /(\/|\.|-|_|\(|\)|:|\+)/gi, '' );
  }


  isAllCharacteresEquals( c ) {
    let result = true;
    for ( let i = 1; i <= 9; i++ ) {
      if ( this.cnpjUnmasked( c ).substring( i - 1, i ) !== this.cnpjUnmasked( c )[ 0 ] ) {
        result = false;
        break;
      }
    }
    return result;
  }

}
