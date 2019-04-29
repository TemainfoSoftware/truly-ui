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

export interface DateFormat {
  day: number;
  month: number;
  year: number;
  stringFormat: string;
}

export function ReverseFormatDate( value, formatDate ): DateFormat {
  formatDate = formatDate.toLowerCase();
  const formatTmp = formatDate.replace( /[a-z]/gi, '' );
  const formatArray = formatTmp.split( '' );
  let day;
  let month;
  let year;
  const pattern = formatDate.split( formatArray[ 0 ] );

  if ( value ) {
    for ( let i = 0; i < pattern.length; i++ ) {
      switch ( pattern[ i ] ) {
        case 'dd':
          day = value.substr( formatDate.indexOf( 'd' ),
            (value.length - formatDate.length) + pattern[ i ].length );
          break;
        case 'mm':
          month = value.substr( formatDate.indexOf( 'm' ),
            (value.length - formatDate.length) + pattern[ i ].length );
          break;
        case 'yyyy':
          year = value.substr( formatDate.indexOf( 'y' ),
            (value.length - formatDate.length) + pattern[ i ].length );
          break;
      }
    }
  }

  return {
    'day': parseInt( day, 10 ),
    'month': parseInt( month, 10 ),
    'year': parseInt( year, 10 ),
    'stringFormat': `${parseInt( year, 10 )}-${parseInt( month, 10 )}-${parseInt( day, 10 )}`
  };

}
