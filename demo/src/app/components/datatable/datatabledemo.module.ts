import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {DataTableDemo} from './datatabledemo.component';
import {DatatableModule} from '../../../../../src/datatable';
import {InputModule} from '../../../../../src/input';
import { DataTableDemoRoutingModule } from './datatabledemo-routing.module';
import {HighlightJsModule} from 'ngx-highlight-js';


@NgModule({
  declarations: [
    DataTableDemo
  ],
  imports: [
    DataTableDemoRoutingModule,
    DatatableModule,
    InputModule,
    CommonModule,
    FormsModule,
    HighlightJsModule
  ],
  exports: [
    DataTableDemo
  ]
})
export class DatatableDemoModule {
}
