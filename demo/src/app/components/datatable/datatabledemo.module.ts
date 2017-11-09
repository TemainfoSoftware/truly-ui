import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {HighlightJsModule} from 'ngx-highlight-js';

import {DatatableModule} from 'truly-ui/datatable';
import {InputModule} from 'truly-ui/input';

import {DataTableDemoComponent} from './datatabledemo.component';
import {DataTableDemoRoutingModule } from './datatabledemo-routing.module';

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
