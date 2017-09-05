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

import { NewPerson } from "./newperson/newperson.component";
import { DataFormService } from "./newperson/dataform.service";
import { FormDemo } from "./formdemo.component";
import { FormDemoRoutingModule } from "./formdemo-routing.module";
import { DialogModule } from "truly-ui/dialog";
import { RadioButtonModule } from "truly-ui/radiobutton";
import { CheckBoxModule } from "truly-ui/checkbox";

@NgModule({
  declarations: [
    NewPerson,
    FormDemo,
  ],
  imports:[
    CommonModule,
    ButtonModule,
    RadioButtonModule,
    DatatableModule,
    DropDownListModule,
    InputModule,
    CheckBoxModule,
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
    NewPerson,
  ],
  providers: [
    DataFormService
  ],
  entryComponents: [
    NewPerson
  ]
})
export class FormDemoModule {}
