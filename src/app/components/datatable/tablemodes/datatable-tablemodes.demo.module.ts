import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { DatatableTableModesDemoComponent } from './datatable-tablemodes.demo.component';
import { DatatableTableModesDemoRoutingModule } from './datatable-tablemodes.demo.routing.module';
import { DatatableModule } from '../../../../../projects/truly-ui/src/components/datatable';
import { InputModule } from '../../../../../projects/truly-ui/src/components/input';
import { ShowcaseCardModule } from '../../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseHeaderModule } from '../../../shared/components/showcase-header/showcase-header.module';

@NgModule({
  declarations: [
    DatatableTableModesDemoComponent
  ],
  imports: [
    CommonModule,
    DatatableTableModesDemoRoutingModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    DatatableModule,
    FormsModule,
    HighlightJsModule,
    InputModule,
    ShowcaseHeaderModule
  ],
  exports: [
    DatatableTableModesDemoComponent
  ]
})
export class DatatableTableModesDemoModule {}
