import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";

import { RadioButtonModule } from 'truly-ui/radiobutton';

import { RadioButtonDemo } from "./radiobuttondemo.component";
import { RadioButtonDemoRoutingModule } from "./radiobuttondemo-routing.module";
import { HighlightJsModule } from 'ngx-highlight-js';

@NgModule({
  declarations: [
    RadioButtonDemo
  ],
  imports:[
    CommonModule,
    FormsModule,
    HighlightJsModule,
    RadioButtonDemoRoutingModule,
    RadioButtonModule
  ],
  exports: [
    RadioButtonDemo
  ]
})
export class RadioButtonDemoModule {}
