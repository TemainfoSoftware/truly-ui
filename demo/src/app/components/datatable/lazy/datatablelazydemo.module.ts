import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {HighlightJsModule} from 'ngx-highlight-js';

import {DatatableModule} from 'truly-ui/datatable';
import {InputModule} from 'truly-ui/input';

import {DataTableLazyDemoComponent} from './datatablelazydemo.component';
import { DataTableLazyDemoRoutingModule } from './datatablelazydemo-routing.module';

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
