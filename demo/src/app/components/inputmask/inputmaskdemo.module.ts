import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";

import { HighlightJsModule } from 'ngx-highlight-js';

import { InputModule } from 'truly-ui/input';
import { TooltipModule } from 'truly-ui/tooltip';

import { InputMaskDemo } from "./inputmaskdemo.component";
import { InputMaskDemoRoutingModule } from "./inputmaskdemo-routing.module";

@NgModule({
  declarations: [
    InputMaskDemo
  ],
  imports:[
    CommonModule,
    FormsModule,
    HighlightJsModule,
    InputMaskDemoRoutingModule,
    InputModule,
    TooltipModule
  ],
  exports: [
    InputMaskDemo
  ]
})
export class InputMaskDemoModule {}
