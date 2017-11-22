import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {HighlightJsModule} from 'ngx-highlight-js';


import {DataTableDemoComponent} from './datatabledemo-overview.component';
import {DatatabledemoOverviewRoutingModule } from './datatabledemo-overview-routing.module';
import { DatatableModule } from '../../../../components/datatable';
import { InputModule } from '../../../../components/input';

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
    InputModule,
  ],
  exports: [
    DataTableDemoComponent
  ]
})
export class DatatableDemoOverviewModule {}
