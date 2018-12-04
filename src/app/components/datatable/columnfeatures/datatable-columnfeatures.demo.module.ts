import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { DatatableColumnFeaturesDemoComponent } from './datatable-columnfeatures.demo.component';
import { DatatableColumnFeaturesDemoRoutingModule } from './datatable-columnfeatures.demo.routing.module';
import { DatatableModule } from '../../../../../projects/truly-ui/src/components/datatable';
import { InputModule } from '../../../../../projects/truly-ui/src/components/input';
import { ShowcaseTableEventsModule } from '../../../shared/components/showcase-table-events/showcase-table-events.module';
import { ShowcaseCardModule } from '../../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseHeaderModule } from '../../../shared/components/showcase-header/showcase-header.module';

@NgModule({
  declarations: [
    DatatableColumnFeaturesDemoComponent
  ],
  imports: [
    CommonModule,
    DatatableColumnFeaturesDemoRoutingModule,
    DatatableModule,
    ShowcaseTableEventsModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    FormsModule,
    HighlightJsModule,
    InputModule,
    ShowcaseHeaderModule
  ],
  exports: [
    DatatableColumnFeaturesDemoComponent
  ]
})
export class DatatableColumnFeaturesDemoModule {}
