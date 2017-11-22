import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { DatatableColumnFeaturesDemoComponent } from './datatable-columnfeatures.demo.component';
import { DatatableColumnFeaturesDemoRoutingModule } from './datatable-columnfeatures.demo.routing.module';
import { DatatableModule } from '../../../../components/datatable';
import { InputModule } from '../../../../components/input';

@NgModule({
  declarations: [
    DatatableColumnFeaturesDemoComponent
  ],
  imports: [
    CommonModule,
    DatatableColumnFeaturesDemoRoutingModule,
    DatatableModule,
    FormsModule,
    HighlightJsModule,
    InputModule,
  ],
  exports: [
    DatatableColumnFeaturesDemoComponent
  ]
})
export class DatatableColumnFeaturesDemoModule {}
