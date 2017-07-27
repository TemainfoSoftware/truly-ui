import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';

import { FormDemo } from "./formdemo.component";
import { FormDemoRoutingModule } from "./formdemo-routing.module";
import { CommonModule  } from '@angular/common';
import { HighlightJsModule } from 'ngx-highlight-js';
import { InputModule } from '../../../../../src/input';
import { ButtonModule } from '../../../../../src/button';
import { CadPessoa } from "./newpessoa/cadPessoa.component";
import { DatatableModule } from '../../../../../src/datatable';
import { ModalModule } from "../../../../../src/modal/index";
import { FormModule } from "../../../../../src/form/index";
import { DataFormService } from "./newpessoa/dataform.service";

@NgModule({
  declarations: [
    FormDemo,
    CadPessoa,
  ],
  imports:[
    FormDemoRoutingModule,
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
    FormDemo,
    CadPessoa,
  ],
  providers: [DataFormService],
  entryComponents: [ CadPessoa ]
})
export class FormDemoModule {

}
