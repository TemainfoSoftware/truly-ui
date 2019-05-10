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
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TlAutoComplete } from './autocomplete';
import { InputModule } from '../input/index';
import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { InternalsModule } from '../internals/index';
import { IconsModule } from '../icons/index';
import { BlockUIModule } from '../blockui/index';
import { AUTOCOMPLETE_CONFIG, AutoCompleteConfig } from './interfaces/autocomplete.config';
import { FilterContainerModule } from '../core/components/filter/filter-container.module';
import { ItemSelectedModule } from '../core/directives/itemSelected/item-selected.module';
import { A11yModule } from '@angular/cdk/a11y';
import { LoaderModule } from '../loader/index';
import { MiscModule } from '../misc/index';

@NgModule( {
  imports: [
    CommonModule,
    OverlayModule,
    ScrollingModule,
    InputModule,
    LoaderModule,
    FormsModule,
    BlockUIModule,
    A11yModule,
    IconsModule,
    MiscModule,
    ReactiveFormsModule,
    InternalsModule,
    FilterContainerModule,
    ItemSelectedModule,
  ],
  declarations: [
    TlAutoComplete,
  ],
  exports: [
    TlAutoComplete,
  ],
} )
export class AutoCompleteModule {
  static forRoot(config: AutoCompleteConfig = null ): ModuleWithProviders {
    return {
      ngModule: AutoCompleteModule,
      providers: [
        { provide: AUTOCOMPLETE_CONFIG, useValue: config },
      ]
    };
  }
}
