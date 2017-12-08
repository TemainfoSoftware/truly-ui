import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { DatatableRowModelsDemoComponent } from './datatable-rowmodels.demo.component';
import { DatatableRowModelsDemoRoutingModule } from './datatable-rowmodels.demo.routing.module';
import { DatatableModule } from '../../../../components/datatable';
import { InputModule } from '../../../../components/input';
import { ShowcaseCardModule } from '../../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTableEventsModule } from '../../../shared/components/showcase-table-events/showcase-table-events.module';
import { ShowcaseTablePropertiesModule } from '../../../shared/components/showcase-table-properties/showcase-table-properties.module';

@NgModule({
  declarations: [
    DatatableRowModelsDemoComponent
  ],
  imports: [
    CommonModule,
    DatatableRowModelsDemoRoutingModule,
    DatatableModule,
    ShowcaseCardModule,
    ShowcaseTableEventsModule,
    ShowcaseTablePropertiesModule,
    FormsModule,
    HttpClientModule,
    HighlightJsModule,
    InputModule,
  ],
  exports: [
    DatatableRowModelsDemoComponent
  ]
})
export class DatatableRowModelsDemoModule {}
