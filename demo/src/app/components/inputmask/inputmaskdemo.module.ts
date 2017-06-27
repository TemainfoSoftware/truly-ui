import { CommonModule  } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';

import { InputMaskDemo } from "./inputmaskdemo.component";
import { InputModule } from '../../../../../src/input';
import { InputMaskDemoRoutingModule } from "./inputmaskdemo-routing.module";
import { HighlightJsModule } from 'ngx-highlight-js';
import { TooltipModule } from '../../../../../src/tooltip';
import { DirectiveModule } from '../../../../../src/core/directives/index';

@NgModule({
  declarations: [
    InputMaskDemo
  ],
  imports:[
    InputMaskDemoRoutingModule,
    InputModule,
    CommonModule,
    FormsModule,
    HighlightJsModule,
    DirectiveModule,
    TooltipModule
  ],
  exports: [
    InputMaskDemo
  ]
})
export class InputMaskDemoModule {}
