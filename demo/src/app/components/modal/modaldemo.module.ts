import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';

import { ModalDemo } from "./modaldemo.component";
import { ModalDemoRoutingModule } from "./modaldemo-routing.module";
import { CommonModule  } from '@angular/common';
import { HighlightJsModule } from 'ngx-highlight-js';
import { InputModule } from '../../../../../src/input';
import { ButtonModule } from '../../../../../src/button';
import { CadPessoa } from "./newpessoa/cadPessoa.component";
import { DatatableModule } from '../../../../../src/datatable';
import { NewModal } from "./newmodal/newModal.component";
import { ModalModule } from "../../../../../src/modal/index";
import { FormModule } from "../../../../../src/form/index";

@NgModule({
  declarations: [
    ModalDemo,
    CadPessoa,
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
    CadPessoa,
    NewModal
  ],
  entryComponents: [ CadPessoa, NewModal ]
})
export class ModalDemoModule {

}
