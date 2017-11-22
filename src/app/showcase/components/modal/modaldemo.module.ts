import { FormsModule } from '@angular/forms';
import { CommonModule  } from '@angular/common';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { NewModalComponent } from './newmodal/newModal.component';
import { ModalDemoComponent } from './modaldemo.component';
import { ModalDemoRoutingModule } from './modaldemo-routing.module';
import { ButtonModule } from '../../../components/button';
import { DatatableModule } from '../../../components/datatable';
import { InputModule } from '../../../components/input';
import { ModalModule } from '../../../components/modal';
import { DialogService } from '../../../components/dialog';
import { ShowcaseCardModule } from '../showcase-card/showcase-card.module';

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
    InputModule,
    ModalModule,
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
export class ModalDemoModule {}
