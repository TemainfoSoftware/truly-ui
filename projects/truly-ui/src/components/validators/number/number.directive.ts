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

import { ContentChild, Directive, forwardRef, HostListener } from '@angular/core';
import {FormControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import { TlInput } from '../../input/input';
import { NumberValidator } from './number.validator';

@Directive( {
    selector: '[number][ngModel],[number][formControl],[number][formControlName]',
    providers: [
      {
        multi: true,
        provide: NG_VALIDATORS,
        useExisting: forwardRef( () => NumberDirective),
      }
    ]
} )
export class NumberDirective implements Validator {

    private regex = new RegExp( '^[0-9]*$' );

    @ContentChild(TlInput, {static: true}) tlinput;

    constructor() {}

    @HostListener('keypress', ['$event'])
    onKeyDown($event) {
      if (!this.regex.test($event.key) && (!this.handleNegativeNumber($event))) {
        $event.preventDefault();
      }
    }

    handleNegativeNumber($event) {
      return ($event.keyCode === 45) && ($event.target.selectionStart === 0);
    }

    validate( c: FormControl ): ValidationErrors {
      if (this.tlinput.input.nativeElement.value.length > 0) {
        return NumberValidator()( c );
      }
    }
}
