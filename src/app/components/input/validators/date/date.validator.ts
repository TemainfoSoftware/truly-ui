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
import { CustomType } from '../../core/custom-type';
import { ReverseFormatDate } from '../../../core/helper/reverseformatdate';

let formatDate;

export class DateTl implements CustomType {

  private date: Date;

  private tlinput;

  constructor( tlinput, format ) {
    this.tlinput = tlinput;
    formatDate = format;
  }

  validate(): ValidatorFn {
    return ( c: AbstractControl ) => {

      if ( !this.stringUnmasked( c ) && c.touched ) {
        return { date: 'Invalid Date, value must match with pattern [ ' + formatDate.toUpperCase() + ' ]' };
      }

      if ( (this.stringUnmasked( c ).length) !== formatDate.length ) {
        return { date: 'Invalid Date, value must match with pattern [ ' + formatDate.toUpperCase() + ' ]' };
      }

      const formattedDate = ReverseFormatDate(this.stringUnmasked(c), formatDate);
      this.date = new Date( formattedDate['year'] + '-' + formattedDate['month'] + '-' + formattedDate['day'] );

      if ( this.date.toDateString() === 'Invalid Date' ) {
        return { date: 'Invalid Date, value must match with pattern [ ' + formatDate.toUpperCase() + ' ]' };
      }

      return null;
    };
  }


  stringUnmasked( c ) {
    return String( c.value ).replace( /(\|-|_|\(|\)|:|\+)/gi, '' );
  }
}
