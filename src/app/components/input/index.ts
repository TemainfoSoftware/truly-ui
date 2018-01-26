import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { IdGeneratorService } from '../core/helper/idgenerator.service';
import { NameGeneratorService } from '../core/helper/namegenerator.service';
import { TabIndexService } from '../form/tabIndex.service';

import { TlInput } from './input';

import { CharcaseDirective } from './directives/charcase.directive';
import { CPFDirective } from './validators/cpf/cpf.directive';
import { CNPJDirective } from './validators/cnpj/cnpj.directive';
import { DateDirective } from './validators/date/date.directive';
import { NumberDirective } from './validators/number/number.directive';
import { EmailDirective } from './validators/email/email.directive';
import { CreditCardDirective } from './validators/creditcard/creditcard.directive';

export * from './input';

@NgModule( {
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    TlInput,
    CharcaseDirective,
    CPFDirective,
    CNPJDirective,
    DateDirective,
    NumberDirective,
    EmailDirective,
    CreditCardDirective
  ],
  exports: [
    TlInput,
    CharcaseDirective,
    CPFDirective,
    CNPJDirective,
    DateDirective,
    NumberDirective,
    EmailDirective,
    CreditCardDirective
  ],
  providers: [
    IdGeneratorService,
    NameGeneratorService,
    TabIndexService
  ]
} )
export class InputModule {
}
