/*
 MIT License

 Copyright (c) 2017 Temainfo Sistemas

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
import { CustomType } from '../../core/custom-type';

export class CPF implements CustomType {

  validate(): ValidatorFn {
    return ( control: AbstractControl ) => {

      let sum;

      let leftover;

      sum = 0;

      if ( control.touched ) {

        if ( (this.cpfUnmasked( control ) === null) || (this.cpfUnmasked( control ).length < 9) ) {
          return { cpf: false };
        }

        if ( this.isAllCharacteresEquals( control ) ) {
          return { cpf: false };
        }

        for ( let i = 1; i <= 9; i++ ) {
          sum = sum + Number( this.cpfUnmasked( control ).substring( i - 1, i ) ) * (11 - i);
        }

        leftover = (sum * 10) % 11;
        if ( (leftover === 10) || (leftover === 11) ) {
          leftover = 0;
        }
        if ( leftover !== Number( this.cpfUnmasked( control ).substring( 9, 10 ) ) ) {
          return { cpf: false };
        }
        sum = 0;
        for ( let i = 1; i <= 10; i++ ) {
          sum = sum + Number( this.cpfUnmasked( control ).substring( i - 1, i ) ) * (12 - i);
        }
        leftover = (sum * 10) % 11;
        if ( (leftover === 10) || (leftover === 11) ) {
          leftover = 0;
        }
        if ( leftover !== Number( this.cpfUnmasked( control ).substring( 10, 11 ) ) ) {
          return { cpf: false };
        }

      }
      return null;
    };
  }

  cpfUnmasked( c ) {
    return String( c.value ).replace( /(\/|\.|-|_|\(|\)|:|\+)/gi, '' );
  }


  isAllCharacteresEquals( c ) {
    let result = true;
    for ( let i = 1; i <= 9; i++ ) {
      if ( this.cpfUnmasked( c ).substring( i - 1, i ) !== this.cpfUnmasked( c )[ 0 ] ) {
        result = false;
        break;
      }
    }
    return result;
  }

}

