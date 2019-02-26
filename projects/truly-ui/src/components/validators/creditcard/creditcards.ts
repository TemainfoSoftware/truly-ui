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

 export const list = {
   visa: {regex: /^(?:4[0-9]{12}(?:[0-9]{3})?)$/, id: ['4'], name: 'visa'},
   mastercard: {regex: /^(?:5[1-5][0-9]{14})$/, id: [ '51', '52', '53', '54', '55' ], name: 'mastercard'},
   amex: {regex: /^(?:3[47][0-9]{13})$/, id: [ '34', '37' ], name: 'amex'},
   dinnersclub: {regex: /^3(?:0[0-5]|[68][0-9])[0-9]{11}/, id: [ '36', '38' ], name: 'dinnersclub'},
   discover: {regex: /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/, id: [ '36', '38' ], name: 'discover'},
 };
