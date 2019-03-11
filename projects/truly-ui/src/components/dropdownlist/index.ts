import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TlDropDownList } from './dropdownlist';

import { InputModule } from '../input/index';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { OverlayListModule } from '../overlaylist/index';
import { InternalsModule } from '../internals/index';
import { IconsModule } from '../icons/index';
import { DROPDOWN_CONFIG, DropdownConfig } from './interfaces/dropdown.config';
import { LoaderModule } from '../loader/index';

@NgModule( {
  imports: [
    CommonModule,
    InputModule,
    OverlayListModule,
    IconsModule,
    LoaderModule,
    OverlayModule,
    A11yModule,
    InternalsModule,
    FormsModule
  ],
  declarations: [
    TlDropDownList,
  ],
  exports: [
    TlDropDownList,
  ],
} )
export class DropDownListModule {
  static forRoot(config: DropdownConfig = null): ModuleWithProviders {
    return {
      ngModule: DropDownListModule,
      providers: [
        { provide: DROPDOWN_CONFIG, useValue: config },
      ]
    };
  }
}
