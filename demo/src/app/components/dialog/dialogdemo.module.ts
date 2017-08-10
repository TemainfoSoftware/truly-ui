import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";

import { HighlightJsModule } from 'ngx-highlight-js';
import { InputModule } from 'truly-ui/input';
import { ButtonModule } from 'truly-ui/button';
import { DatatableModule } from 'truly-ui/datatable';

import { DialogDemo } from "./dialogdemo.component";
import { DialogDemoRoutingModule } from "./dialogdemo-routing.module";

@NgModule({
  declarations: [
    DialogDemo,
  ],
  imports:[
    ButtonModule,
    CommonModule,
    DatatableModule,
    DialogDemoRoutingModule,
    FormsModule,
    HighlightJsModule,
    InputModule,
  ],
  exports: [
    DialogDemo,
  ],
})
export class DialogDemoModule {

}
