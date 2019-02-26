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

export function CPFValidator( ): ValidatorFn {
  return ( control: AbstractControl ) => {

    let sum = 0;
    let leftover;

    if ( (cpfUnmasked( control ) === null) || (cpfUnmasked( control ).length < 9) ) {
      return { cpf: LOCALE_I18N.Validators.invalidCPF };
    }

    if ( isAllCharacteresEquals( control ) ) {
      return { cpf: LOCALE_I18N.Validators.invalidCPF };
    }

    for ( let i = 1; i <= 9; i++ ) {
      sum = sum + Number( cpfUnmasked( control ).substring( i - 1, i ) ) * (11 - i);
    }

    leftover = (sum * 10) % 11;
    if ( (leftover === 10) || (leftover === 11) ) {
      leftover = 0;
    }

    if ( leftover !== Number( cpfUnmasked( control ).substring( 9, 10 ) ) ) {
      return { cpf: LOCALE_I18N.Validators.invalidCPF };
    }
    sum = 0;
    for ( let i = 1; i <= 10; i++ ) {
      sum = sum + Number( cpfUnmasked( control ).substring( i - 1, i ) ) * (12 - i);
    }

    leftover = (sum * 10) % 11;
    if ( (leftover === 10) || (leftover === 11) ) {
      leftover = 0;
    }

    if ( leftover !== Number( cpfUnmasked( control ).substring( 10, 11 ) ) ) {
      return { cpf: LOCALE_I18N.Validators.invalidCPF };
    }

    return null;
  };
}

export function cpfUnmasked( c ) {
  return String( c.value ).replace( /(\/|\.|-|_|\(|\)|:|\+)/gi, '' );
}

export function isAllCharacteresEquals( c ) {
  let result = true;
  for ( let i = 1; i <= 9; i++ ) {
    if ( cpfUnmasked( c ).substring( i - 1, i ) !== cpfUnmasked( c )[ 0 ] ) {
      result = false;
      break;
    }
  }
  return result;
}

