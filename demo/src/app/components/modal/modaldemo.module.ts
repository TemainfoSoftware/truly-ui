import { FormsModule } from '@angular/forms';
import { CommonModule  } from '@angular/common';
import { NgModule } from "@angular/core";

import { HighlightJsModule } from 'ngx-highlight-js';

import { ButtonModule } from 'truly-ui/button';
import { FormModule } from "truly-ui/form/index";
import { DatatableModule } from 'truly-ui/datatable';
import { DialogService } from "truly-ui/dialog/dialog.service";
import { InputModule } from 'truly-ui/input';
import { ModalModule } from "truly-ui/modal/index";

import { NewModal } from "./newmodal/newModal.component";
import { ModalDemo } from "./modaldemo.component";
import { ModalDemoRoutingModule } from "./modaldemo-routing.module";

@NgModule({
  declarations: [
    ModalDemo,
    NewModal,
  ],
  imports:[
    ButtonModule,
    CommonModule,
    DatatableModule,
    FormsModule,
    FormModule,
    HighlightJsModule,
    InputModule,
    ModalModule,
    ModalDemoRoutingModule
  ],
  exports: [
    ModalDemo,
    NewModal
  ],
  providers: [
    DialogService
  ],
  entryComponents: [
    NewModal
  ]
})
export class ModalDemoModule {}
