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

import { CustomType } from '../../input/core/custom-type';
import { DateTl } from './date.validator';

export class DateFactory {

  static getInstance( tlinput, format ): CustomType {
    this.setDateMask( tlinput, format );
    return new DateTl(tlinput, format);
  }

  static setDateMask( tlinput, format ) {
    if ( tlinput ) {
      const formatTmp = format.replace( /[a-z]/gi, '' );
      const formatArray = format.split( '' );

      for ( let i = 0; i < formatArray.length; i++ ) {
        if ( formatArray[ i ] !== formatTmp[ 0 ] ) {
          formatArray[ i ] = '9';
        }
      }
      const strFormat = formatArray.toString().replace( /,/gi, '' );
      tlinput.mask = strFormat;
      tlinput.input.nativeElement.setAttribute('placeholder', format.toUpperCase());
    }
  }
}
