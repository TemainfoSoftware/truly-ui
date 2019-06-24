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

import { ContentChild, Directive, forwardRef } from '@angular/core';
import {FormControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import { TlInput } from '../../input/input';
import { CNPJValidator } from './cnpj.validator';

@Directive( {
    selector: '[cnpj][ngModel],[cnpj][formControl],[cnpj][formControlName]',
    providers: [
      {
        multi: true,
        provide: NG_VALIDATORS,
        useExisting: forwardRef( () => CNPJDirective),
      }
    ]
} )
export class CNPJDirective implements Validator {

    @ContentChild(TlInput, {static: true}) input;

    validate( c: FormControl ): ValidationErrors {
      if ( this.input ) {
        this.input.mask = '99.999.999/9999-99';
      }
      return CNPJValidator()( c );
    }
}
