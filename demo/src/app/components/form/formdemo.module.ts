import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";

import { HighlightJsModule } from 'ngx-highlight-js';

import { ButtonModule } from 'truly-ui/button';
import { DatatableModule } from 'truly-ui/datatable';
import { DropDownListModule } from "truly-ui/dropdownlist";
import { FormModule } from "truly-ui/form";
import { InputModule } from 'truly-ui/input';
import { ModalModule } from "truly-ui/modal";
import { TooltipModule } from "truly-ui/tooltip";

import { CadPessoa } from "./newpessoa/cadPessoa.component";
import { DataFormService } from "./newpessoa/dataform.service";
import { FormDemo } from "./formdemo.component";
import { FormDemoRoutingModule } from "./formdemo-routing.module";
import { DialogModule } from "truly-ui/dialog";
import { RadioButtonModule } from "truly-ui/radiobutton";

@NgModule({
  declarations: [
    CadPessoa,
    FormDemo,
  ],
  imports:[
    CommonModule,
    ButtonModule,
    RadioButtonModule,
    DatatableModule,
    DropDownListModule,
    InputModule,
    FormDemoRoutingModule,
    FormModule.forRoot(),
    DialogModule,
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
