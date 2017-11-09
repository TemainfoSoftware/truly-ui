import { FormsModule } from '@angular/forms';
import { CommonModule  } from '@angular/common';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { ButtonModule } from 'truly-ui/button';
import { DatatableModule } from 'truly-ui/datatable';
import { DialogService } from 'truly-ui/dialog/dialog.service';
import { InputModule } from 'truly-ui/input';
import { ModalModule } from 'truly-ui/modal';

import { NewModalComponent } from './newmodal/newModal.component';
import { ModalDemoComponent } from './modaldemo.component';
import { ModalDemoRoutingModule } from './modaldemo-routing.module';

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
