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
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { AutoCompleteDemoComponent } from './autocompletedemo.component';
import { AutoCompleteDemoRoutingModule } from './autocompletedemo-routing.module';
import { NewClientComponent } from './newclient/newclient.component';
import { DataClientService } from './newclient/dataclient.service';
import { DumpDataService } from '../../shared/services/dumpdata';
import { AutoCompleteModule } from '../../../../projects/truly-ui/src/components/autocomplete';
import { DialogModule } from '../../../../projects/truly-ui/src/components/dialog';
import { InputModule } from '../../../../projects/truly-ui/src/components/input';
import { FormModule } from '../../../../projects/truly-ui/src/components/form';
import { DropDownListModule } from '../../../../projects/truly-ui/src/components/dropdownlist';
import { ModalModule } from '../../../../projects/truly-ui/src/components/modal';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { ShowcaseReturnedValueModule } from '../../shared/components/showcase-returned-value/showcase-returned-value.module';
import { DialogService } from '../../../../projects/truly-ui/src/components/dialog/dialog.service';
import { PersonService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { ShowcaseHeaderModule } from '../../shared/components/showcase-header/showcase-header.module';


@NgModule({
  declarations: [
    AutoCompleteDemoComponent,
    NewClientComponent
  ],
  imports: [
    AutoCompleteDemoRoutingModule,
    AutoCompleteModule,
    CommonModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    InputModule,
    FormModule,
    DropDownListModule,
    AutoCompleteModule,
    ModalModule,
    HttpClientModule,
    HighlightJsModule,
    ShowcaseTablePropertiesModule,
    ShowcaseCardModule,
    ShowcaseTableEventsModule,
    ShowcaseReturnedValueModule,
    ShowcaseHeaderModule
  ],
  exports: [
    AutoCompleteDemoComponent,
  ],
  providers: [
    DialogService,
    DataClientService,
    DumpDataService,
    PersonService
  ],
  entryComponents: [ NewClientComponent ]
})
export class AutoCompleteDemoModule { }
