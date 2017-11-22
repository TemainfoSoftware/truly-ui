import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { DatatableFilteringDemoComponent } from './datatable-filtering.demo.component';
import { DatatableFilteringDemoRoutingModule } from './datatable-filtering.demo.routing.module';
import { DatatableModule } from '../../../../components/datatable';
import { InputModule } from '../../../../components/input';

@NgModule({
  declarations: [
    DatatableFilteringDemoComponent
  ],
  imports: [
    CommonModule,
    DatatableFilteringDemoRoutingModule,
    DatatableModule,
    FormsModule,
    HighlightJsModule,
    InputModule,
  ],
  exports: [
    DatatableFilteringDemoComponent
  ]
})
export class DatatableFilteringDemoModule {}
