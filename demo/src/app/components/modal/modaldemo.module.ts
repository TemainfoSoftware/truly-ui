import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';

import { ModalDemo } from "./modaldemo.component";
import { ModalDemoRoutingModule } from "./modaldemo-routing.module";
import { CommonModule  } from '@angular/common';
import { HighlightJsModule } from 'ngx-highlight-js';
import { InputModule } from '../../../../../src/input';
import { ButtonModule } from '../../../../../src/button';
import { CadPessoa } from "./cadastro2/cadPessoa.component";
import { DatatableModule } from '../../../../../src/datatable';
import { NewPessoa } from "./novo/newPessoa.component";
import { ModalModule } from "../../../../../src/modal/index";

@NgModule({
  declarations: [
    ModalDemo,
    CadPessoa,
    NewPessoa,
  ],
  imports:[
    ModalDemoRoutingModule,
    InputModule,
    CommonModule,
    FormsModule,
    ModalModule,
    ButtonModule,
    HighlightJsModule,
    DatatableModule
  ],
  exports: [
    ModalDemo,
    CadPessoa,
    NewPessoa
  ],
  entryComponents: [ CadPessoa, NewPessoa ]
})
export class ModalDemoModule {

}
