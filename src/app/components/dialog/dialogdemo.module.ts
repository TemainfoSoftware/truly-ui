import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';
import { ModalModule } from '../../../../projects/truly-ui/src/components/modal';

import { DialogDemoComponent } from './dialogdemo.component';
import { DialogDemoRoutingModule } from './dialogdemo-routing.module';
import { ButtonModule } from '../../../../projects/truly-ui/src/components/button';
import { DatatableModule } from '../../../../projects/truly-ui/src/components/datatable';
import { InputModule } from '../../../../projects/truly-ui/src/components/input';
import { DialogModule } from '../../../../projects/truly-ui/src/components/dialog';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';

@NgModule({
  declarations: [
    DialogDemoComponent,
  ],
  imports: [
    ButtonModule,
    CommonModule,
    DatatableModule,
    DialogDemoRoutingModule,
    FormsModule,
    HighlightJsModule,
    InputModule,
    DialogModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule
  ],
  exports: [
    DialogDemoComponent,
  ],
})
export class DialogDemoModule {

}
