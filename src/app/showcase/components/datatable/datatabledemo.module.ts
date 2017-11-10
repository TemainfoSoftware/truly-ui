import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {HighlightJsModule} from 'ngx-highlight-js';


import {DataTableDemoComponent} from './datatabledemo.component';
import {DataTableDemoRoutingModule } from './datatabledemo-routing.module';
import { DatatableModule } from '../../../components/datatable';
import { InputModule } from '../../../components/input';

@NgModule({
  declarations: [
    DataTableDemoComponent
  ],
  imports: [
    CommonModule,
    DataTableDemoRoutingModule,
    DatatableModule,
    FormsModule,
    HighlightJsModule,
    InputModule,
  ],
  exports: [
    DataTableDemoComponent
  ]
})
export class DatatableDemoModule {}
