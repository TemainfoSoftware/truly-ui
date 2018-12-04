import { FormsModule } from '@angular/forms';
import { CommonModule  } from '@angular/common';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';
import { ModalToolbarModule } from '../../../../projects/truly-ui/src/components/modal/addons/modal-toolbar';

import { NewModalComponent } from './newmodal/newModal.component';
import { ModalDemoComponent } from './modaldemo.component';
import { ModalDemoRoutingModule } from './modaldemo-routing.module';
import { ButtonModule } from '../../../../projects/truly-ui/src/components/button';
import { InputModule } from '../../../../projects/truly-ui/src/components/input';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { ModalModule } from '../../../../projects/truly-ui/src/components/modal/index';
import { ShowcaseHeaderModule } from '../../shared/components/showcase-header/showcase-header.module';

@NgModule({
  declarations: [
    ModalDemoComponent,
    NewModalComponent,
  ],
  imports: [
    ButtonModule,
    CommonModule,
    FormsModule,
    ModalModule,
    HighlightJsModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule,
    InputModule,
    ModalToolbarModule,
    ModalDemoRoutingModule,
    ShowcaseHeaderModule
  ],
  exports: [
    ModalDemoComponent,
    NewModalComponent
  ],

  entryComponents: [
    NewModalComponent
  ]
})
export class ModalDemoModule {

}
