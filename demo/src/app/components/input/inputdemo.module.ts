import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";

import { InputModule } from 'truly-ui/input';
import { TooltipModule } from 'truly-ui/tooltip';

import { InputDemo } from "./inputdemo.component";
import { InputDemoRoutingModule } from "./inputdemo-routing.module";
import { HighlightJsModule } from 'ngx-highlight-js';

@NgModule({
  declarations: [
    InputDemo
  ],
  imports:[
    CommonModule,
    FormsModule,
    HighlightJsModule,
    InputDemoRoutingModule,
    InputModule,
    TooltipModule
  ],
  exports: [
    InputDemo
  ]
})
export class InputDemoModule {}
