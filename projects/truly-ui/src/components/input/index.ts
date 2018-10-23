import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { TlInput } from './input';
import { TlMessageValidationComponent } from './components/messagevalidation/messagevalidation.component';
import { CharcaseDirective } from './directives/charcase.directive';

import { ValidatorsModule } from '../validators/index';
import { OverlayModule } from '@angular/cdk/overlay';
import { InternalsModule } from '../internals/index';
import { CurrencyDirective } from './directives/currency/currency.directive';
import { CURRENCY_MASK_CONFIG, CurrencyConfig } from './directives/currency/currency-mask.config';

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
  static forRoot(config: CurrencyConfig): ModuleWithProviders {
    return {
      ngModule: InputModule,
      providers: [{
        provide: CURRENCY_MASK_CONFIG,
        useValue: config,
      }]
    };
  }
}
