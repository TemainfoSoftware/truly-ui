import { FormsModule } from '@angular/forms';
import { CommonModule  } from '@angular/common';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';
import { MimimizedModalModule } from '../../../components/modal/addons/minimized-modal';

import { NewModalComponent } from './newmodal/newModal.component';
import { ModalDemoComponent } from './modaldemo.component';
import { ModalDemoRoutingModule } from './modaldemo-routing.module';
import { ButtonModule } from '../../../components/button';
import { DatatableModule } from '../../../components/datatable';
import { InputModule } from '../../../components/input';
import { DialogService } from '../../../components/dialog';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';

@NgModule({
  declarations: [
    ModalDemoComponent,
    NewModalComponent,
  ],
  imports: [
    ButtonModule,
    CommonModule,
    DatatableModule,
    FormsModule,
    HighlightJsModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule,
    InputModule,
    MimimizedModalModule,
    ModalDemoRoutingModule
  ],
  exports: [
    ModalDemoComponent,
    NewModalComponent
  ],
  providers: [
    DialogService
  ],
  entryComponents: [
    NewModalComponent
  ]
})
export class ModalDemoModule {

}
