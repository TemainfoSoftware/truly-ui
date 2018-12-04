import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { DatatableFilteringDemoComponent } from './datatable-filtering.demo.component';
import { DatatableFilteringDemoRoutingModule } from './datatable-filtering.demo.routing.module';
import { DatatableModule } from '../../../../../projects/truly-ui/src/components/datatable';
import { InputModule } from '../../../../../projects/truly-ui/src/components/input';
import { ShowcaseHeaderModule } from '../../../shared/components/showcase-header/showcase-header.module';

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
    ShowcaseHeaderModule
  ],
  exports: [
    DatatableFilteringDemoComponent
  ]
})
export class DatatableFilteringDemoModule {}
