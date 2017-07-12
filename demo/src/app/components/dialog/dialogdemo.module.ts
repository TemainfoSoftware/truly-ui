import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';

import { DialogDemo } from "./dialogdemo.component";

import { DialogDemoRoutingModule } from "./dialogdemo-routing.module";
import { CommonModule  } from '@angular/common';
import { HighlightJsModule } from 'ngx-highlight-js';
import { InputModule } from '../../../../../src/input';
import { ButtonModule } from '../../../../../src/button';
import { DatatableModule } from '../../../../../src/datatable';

@NgModule({
  declarations: [
    DialogDemo,
  ],
  imports:[
    DialogDemoRoutingModule,
    InputModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    HighlightJsModule,
    DatatableModule,
  ],
  exports: [
    DialogDemo,
  ],
})
export class DialogDemoModule {

}
