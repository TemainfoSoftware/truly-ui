import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {HighlightJsModule} from 'ngx-highlight-js';


import {DataTableScrollableDemoComponent} from './datatablescrollabledemo.component';
import {DataTableScrollableDemoRoutingModule} from './datatablescrollabledemo-routing.module';
import { DatatableModule } from '../../../../../projects/truly-ui/src/components/datatable';
import { InputModule } from '../../../../../projects/truly-ui/src/components/input';
import { ShowcaseHeaderModule } from '../../../shared/components/showcase-header/showcase-header.module';

@NgModule({
  declarations: [
    DataTableScrollableDemoComponent
  ],
  imports: [
    CommonModule,
    DataTableScrollableDemoRoutingModule,
    DatatableModule,
    FormsModule,
    HighlightJsModule,
    InputModule,
    ShowcaseHeaderModule
  ],
  exports: [
    DataTableScrollableDemoComponent
  ]
})
export class DatatableScrollableDemoModule {}
