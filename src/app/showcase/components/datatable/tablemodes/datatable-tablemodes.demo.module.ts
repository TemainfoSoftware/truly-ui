import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { DatatableTableModesDemoComponent } from './datatable-tablemodes.demo.component';
import { DatatableTableModesDemoRoutingModule } from './datatable-tablemodes.demo.routing.module';
import { DatatableModule } from '../../../../components/datatable';
import { InputModule } from '../../../../components/input';

@NgModule({
  declarations: [
    DatatableTableModesDemoComponent
  ],
  imports: [
    CommonModule,
    DatatableTableModesDemoRoutingModule,
    DatatableModule,
    FormsModule,
    HighlightJsModule,
    InputModule,
  ],
  exports: [
    DatatableTableModesDemoComponent
  ]
})
export class DatatableTableModesDemoModule {}
