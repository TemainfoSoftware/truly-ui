import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { DatatableRowModelsDemoComponent } from './datatable-rowmodels.demo.component';
import { DatatableRowModelsDemoRoutingModule } from './datatable-rowmodels.demo.routing.module';
import { DatatableModule } from '../../../../components/datatable';
import { InputModule } from '../../../../components/input';

@NgModule({
  declarations: [
    DatatableRowModelsDemoComponent
  ],
  imports: [
    CommonModule,
    DatatableRowModelsDemoRoutingModule,
    DatatableModule,
    FormsModule,
    HighlightJsModule,
    InputModule,
  ],
  exports: [
    DatatableRowModelsDemoComponent
  ]
})
export class DatatableRowModelsDemoModule {}
