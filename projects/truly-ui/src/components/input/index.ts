import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { TlInput } from './input';
import { CharcaseDirective } from './directives/charcase.directive';

import { ValidatorsModule } from '../validators/index';
import { OverlayModule } from '@angular/cdk/overlay';
import { IconsModule } from '../icons/index';
import { InternalsModule } from '../internals/index';
import { CurrencyDirective } from './directives/currency/currency.directive';
import { CURRENCY_MASK_CONFIG, CurrencyConfig } from './directives/currency/currency-mask.config';
import { INPUT_CONFIG, InputConfig } from './core/input.config';

@NgModule( {
  imports: [
    CommonModule,
    FormsModule,
    ValidatorsModule,
    IconsModule,
    InternalsModule,
    OverlayModule
  ],
  declarations: [
    TlInput,
    CharcaseDirective,
    CurrencyDirective,
  ],
  exports: [
    TlInput,
    CharcaseDirective,
    CurrencyDirective,
  ],
} )
export class InputModule {
  static forRoot(config: CurrencyConfig = null, inputConfig: InputConfig = null): ModuleWithProviders {
    return {
      ngModule: InputModule,
      providers: [
        { provide: CURRENCY_MASK_CONFIG, useValue: config },
        { provide: INPUT_CONFIG, useValue: inputConfig },
      ]
    };
  }
}
