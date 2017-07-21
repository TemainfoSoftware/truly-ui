import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';

import { ModalDemo } from "./modaldemo.component";
import { ModalDemoRoutingModule } from "./modaldemo-routing.module";
import { CommonModule  } from '@angular/common';
import { HighlightJsModule } from 'ngx-highlight-js';
import { InputModule } from '../../../../../src/input';
import { ButtonModule } from '../../../../../src/button';
import { DatatableModule } from '../../../../../src/datatable';
import { NewModal } from "./newmodal/newModal.component";
import { ModalModule } from "../../../../../src/modal/index";
import { FormModule } from "../../../../../src/form/index";
import { DialogService } from "../../../../../src/dialog/dialog.service";

@NgModule({
  declarations: [
    ModalDemo,
    NewModal,
  ],
  imports:[
    ModalDemoRoutingModule,
    InputModule,
    CommonModule,
    FormsModule,
    ModalModule,
    FormModule,
    ButtonModule,
    HighlightJsModule,
    DatatableModule
  ],
  exports: [
    ModalDemo,
    NewModal
  ],
  providers: [DialogService],
  entryComponents: [ NewModal ]
})
export class ModalDemoModule {

}
