import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {HighlightJsModule} from 'ngx-highlight-js';


import {DataTableDemoComponent} from './datatabledemo-overview.component';
import {DatatabledemoOverviewRoutingModule } from './datatabledemo-overview-routing.module';
import { DatatableModule } from '../../../../../projects/truly-ui/src/components/datatable';
import { InputModule } from '../../../../../projects/truly-ui/src/components/input';
import { ShowcaseCardModule } from '../../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTableEventsModule } from '../../../shared/components/showcase-table-events/showcase-table-events.module';
import { ShowcaseTablePropertiesModule } from '../../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseHeaderModule } from '../../../shared/components/showcase-header/showcase-header.module';

@NgModule({
  declarations: [
    DataTableDemoComponent
  ],
  imports: [
    CommonModule,
    DatatabledemoOverviewRoutingModule,
    DatatableModule,
    FormsModule,
    HighlightJsModule,
    ShowcaseCardModule,
    ShowcaseTableEventsModule,
    ShowcaseTablePropertiesModule,
    InputModule,
    ShowcaseHeaderModule
  ],
  exports: [
    DataTableDemoComponent
  ]
})
export class DatatableDemoOverviewModule {}
