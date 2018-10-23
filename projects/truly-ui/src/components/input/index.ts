import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { TlInput } from './input';
import { TlMessageValidationComponent } from './components/messagevalidation/messagevalidation.component';
import { CharcaseDirective } from './directives/charcase.directive';

import { ValidatorsModule } from '../validators/index';
import { OverlayModule } from '@angular/cdk/overlay';
import { InternalsModule } from '../internals/index';
import { CurrencyDirective } from './directives/currency/currency.directive';

@NgModule( {
  imports: [
    CommonModule,
    FormsModule,
    ValidatorsModule,
    InternalsModule,
    OverlayModule
  ],
  declarations: [
    TlInput,
    CharcaseDirective,
    CurrencyDirective,
    TlMessageValidationComponent,
  ],
  exports: [
    TlInput,
    CharcaseDirective,
    CurrencyDirective,
    TlMessageValidationComponent
  ],
} )
export class InputModule {
}
