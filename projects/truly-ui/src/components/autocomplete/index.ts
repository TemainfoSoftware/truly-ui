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
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TlAutoComplete } from './autocomplete';
import { TabIndexService } from '../form/tabIndex.service';
import { IdGeneratorService } from '../core/helper/idgenerator.service';
import { NameGeneratorService } from '../core/helper/namegenerator.service';

import { ListBoxModule } from '../listbox/index';
import { InputModule } from '../input/index';
import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { InternalsModule } from '../internals/index';
import { TlFilterContainer } from './parts/filter-container';
import { SearchableHighlightDirective } from './parts/directives/searchable-highlight.directive';
import { FilterService } from './filter.service';
import { IconsModule } from '../icons/index';
import { MiscModule } from '../misc/index';
import { BlockUIModule } from '../blockui/index';

@NgModule( {
  imports: [
    CommonModule,
    ListBoxModule,
    OverlayModule,
    ScrollingModule,
    InputModule,
    FormsModule,
    BlockUIModule,
    IconsModule,
    ReactiveFormsModule,
    InternalsModule,
    MiscModule
  ],
  declarations: [
    TlAutoComplete,
    TlFilterContainer,
    SearchableHighlightDirective
  ],
  exports: [
    TlAutoComplete,
    TlFilterContainer,
    SearchableHighlightDirective
  ],
  providers: [
    FilterService
  ]
} )
export class AutoCompleteModule {
}
