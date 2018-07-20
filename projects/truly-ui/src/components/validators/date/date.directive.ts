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

import {
  AfterViewInit,
  Input,
  ContentChild, Directive, forwardRef
} from '@angular/core';
import { FormControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { I18nService } from '../../i18n/i18n.service';
import { DateFactory } from './date.factory';
import { TlInput } from '../../input/input';
import { TlDatePicker } from '../../datepicker/datepicker';

@Directive( {
    selector: '[date][ngModel],[date][formControl],[date][formControlName]',
    providers: [
      {
        multi: true,
        provide: NG_VALIDATORS,
        useExisting: forwardRef( () => DateDirective),
      }
    ]
} )
export class DateDirective implements Validator, AfterViewInit {

    @Input() formatDate = 'dd.mm.yyyy';

    @ContentChild(TlInput) tlinput;

    @ContentChild(TlDatePicker) tldatepicker;

    constructor( private i18n: I18nService ) {}

    ngAfterViewInit() {}

    validate( c: FormControl ) {
      this.getInput();
      return DateFactory.getInstance(
        this.tlinput,
        this.formatDate,
        this.i18n.getLocale().Validators
      ).validate()( c );
    }

    getInput() {
      if (!this.tlinput) {
        this.tldatepicker.formatDate = this.formatDate;
        this.tlinput = this.tldatepicker.tlinput;
      }
    }

}
