/*
 MIT License

 Copyright (c) 2019 Temainfo Sistemas

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
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CPFDirective } from './cpf/cpf.directive';
import { CNPJDirective } from './cnpj/cnpj.directive';
import { NumberDirective } from './number/number.directive';
import { EmailDirective } from './email/email.directive';
import { CreditCardDirective } from './creditcard/creditcard.directive';
import { PasswordDirective } from './password/password.directive';

@NgModule( {
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    CreditCardDirective,
    CPFDirective,
    CNPJDirective,
    EmailDirective,
    NumberDirective,
    PasswordDirective
  ],
  exports: [
    CreditCardDirective,
    CPFDirective,
    CNPJDirective,
    EmailDirective,
    NumberDirective,
    PasswordDirective
  ]
} )
export class ValidatorsModule {}
