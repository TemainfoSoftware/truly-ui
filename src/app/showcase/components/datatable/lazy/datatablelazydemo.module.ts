import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {HighlightJsModule} from 'ngx-highlight-js';

import {DataTableLazyDemoComponent} from './datatablelazydemo.component';
import { DataTableLazyDemoRoutingModule } from './datatablelazydemo-routing.module';
import { DatatableModule } from '../../../../components/datatable';
import { InputModule } from '../../../../components/input';

@NgModule({
  declarations: [
    DataTableLazyDemoComponent
  ],
  imports: [
    CommonModule,
    DataTableLazyDemoRoutingModule,
    DatatableModule,
    FormsModule,
    HighlightJsModule,
    InputModule,
  ],
  exports: [
    DataTableLazyDemoComponent
  ]
})
export class DatatableLazyDemoModule {}
