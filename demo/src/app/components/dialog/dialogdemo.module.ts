import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';

import { DialogDemo } from "./dialogdemo.component";
import { ModalModule } from '../../../../../src/modal';
import { DialogDemoRoutingModule } from "./dialogdemo-routing.module";
import { CommonModule  } from '@angular/common';
import { HighlightJsModule } from 'ngx-highlight-js';
import { InputModule } from '../../../../../src/input';
import { ButtonModule } from '../../../../../src/button';
import { DatatableModule } from '../../../../../src/datatable';
import { DialogModule } from "../../../../../src/dialog/index";


@NgModule({
  declarations: [
    DialogDemo,
  ],
  imports:[
    DialogDemoRoutingModule,
    ModalModule,
    InputModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    HighlightJsModule,
    DatatableModule,
    DialogModule
  ],
  exports: [
    DialogDemo,
  ],
})
export class DialogDemoModule {

}
