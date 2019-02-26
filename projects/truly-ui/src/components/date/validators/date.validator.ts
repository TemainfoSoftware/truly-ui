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

import { ReverseFormatDate } from '../../core/helper/reverseformatdate';
import { TlLeftPadPipe } from '../../internals/pipes/leftpad.pipe';

let dateExpressFormat;

export function DateValidator( formatDate, isoDate ): ValidatorFn {
  dateExpressFormat = formatDate;
  return ( c: AbstractControl ) => {

    if (!c.value) {
      return null;
    }

    if ( !stringUnmasked( c ) && c.touched ) {
      return { date: LOCALE_I18N.Validators.invalidDatePattern + ' [ ' + dateExpressFormat.toUpperCase() + ' ]' };
    }

    if ( (stringUnmasked( c ).length) !== dateExpressFormat.length && !isoDate ) {
      return { date: LOCALE_I18N.Validators.invalidDatePattern + ' [ ' + dateExpressFormat.toUpperCase() + ' ]' };
    }

    const formattedDate = ReverseFormatDate(stringUnmasked(c), dateExpressFormat);
    const date = new Date( formattedDate['year'] + '-' + formattedDate['month'] + '-' + formattedDate['day'] );

    if ( date.toDateString() === 'Invalid Date' ) {
      return { date: LOCALE_I18N.Validators.invalidDatePattern +  ' [ ' + dateExpressFormat.toUpperCase() + ' ]' };
    }

    return null;
  };
}

function stringUnmasked( c ) {
  return String( c.value ).replace( /(\|-|_|\(|\)|:|\+)/gi, '' );
}


