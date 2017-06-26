import { CommonModule  } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';

import { InputDemo } from "./inputdemo.component";
import { InputModule } from '../../../../../src/input';
import { InputDemoRoutingModule } from "./inputdemo-routing.module";
import { HighlightJsModule } from 'ngx-highlight-js';
import { TooltipModule } from '../../../../../src/tooltip';

@NgModule({
  declarations: [
    InputDemo
  ],
  imports:[
    InputDemoRoutingModule,
    InputModule,
    CommonModule,
    FormsModule,
    HighlightJsModule,
    TooltipModule
  ],
  exports: [
    InputDemo
  ]
})
export class InputDemoModule {}
