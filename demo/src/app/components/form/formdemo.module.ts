import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";

import { HighlightJsModule } from 'ngx-highlight-js';

import { ButtonModule } from 'truly-ui/button';
import { DatatableModule } from 'truly-ui/datatable';
import { DropDownListModule } from "truly-ui/dropdownlist/index";
import { FormModule } from "truly-ui/form/index";
import { InputModule } from 'truly-ui/input';
import { ModalModule } from "truly-ui/modal/index";
import { TooltipModule } from "truly-ui/tooltip/index";

import { CadPessoa } from "./newpessoa/cadPessoa.component";
import { DataFormService } from "./newpessoa/dataform.service";
import { FormDemo } from "./formdemo.component";
import { FormDemoRoutingModule } from "./formdemo-routing.module";

@NgModule({
  declarations: [
    CadPessoa,
    FormDemo,
  ],
  imports:[
    CommonModule,
    ButtonModule,
    DatatableModule,
    DropDownListModule,
    InputModule,
    FormDemoRoutingModule,
    FormModule,
    FormsModule,
    ModalModule,
    HighlightJsModule,
    TooltipModule
  ],
  exports: [
    FormDemo,
    CadPessoa,
  ],
  providers: [
    DataFormService
  ],
  entryComponents: [
    CadPessoa
  ]
})
export class FormDemoModule {}
