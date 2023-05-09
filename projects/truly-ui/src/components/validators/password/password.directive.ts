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

import {
  AfterViewInit,
  Input,
  Directive, forwardRef, ElementRef
} from '@angular/core';
import {AbstractControl, FormControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import { PasswordValidator } from './password.validator';
import { PasswordRule } from './passwordrule.interface';

@Directive( {
    selector: '[password][ngModel],[password][formControl],[password][formControlName]',
    providers: [
      {
        multi: true,
        provide: NG_VALIDATORS,
        useExisting: forwardRef( () => PasswordDirective),
      }
    ]
} )
export class PasswordDirective implements Validator, AfterViewInit {

  @Input() control: AbstractControl;

  @Input('passwordRule') passwordRule: PasswordRule =
    { digits: false, uppercase: false, specials: false, lowercase: false };

  private elementInput: HTMLElement;

  constructor(private element: ElementRef) {
  }

  ngAfterViewInit() {
    this.elementInput = this.element.nativeElement.getElementsByTagName('input')[0];
    this.elementInput.setAttribute('type', 'password');
  }

  validate( c: FormControl ): ValidationErrors {
    return PasswordValidator( this.passwordRule )( c );
  }
}
