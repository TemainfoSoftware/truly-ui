import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {HighlightJsModule} from 'ngx-highlight-js';


import {DataTableScrollableDemoComponent} from './datatablescrollabledemo.component';
import {DataTableScrollableDemoRoutingModule} from './datatablescrollabledemo-routing.module';
import { DatatableModule } from '../../../../components/datatable';
import { InputModule } from '../../../../components/input';

@NgModule({
  declarations: [
    DataTableScrollableDemoComponent
  ],
  imports: [
    CommonModule,
    DataTableScrollableDemoRoutingModule,
    DatatableModule,
    FormsModule,
    HighlightJsModule,
    InputModule,
  ],
  exports: [
    DataTableScrollableDemoComponent
  ]
})
export class DatatableScrollableDemoModule {}
