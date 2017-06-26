import { CommonModule  } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';

import { TooltipDemo } from "./tooltipdemo.component";
import { TooltipModule } from '../../../../../src/tooltip';
import { TooltipDemoRoutingModule } from "./tooltipdemo-routing.module";
import { HighlightJsModule } from 'ngx-highlight-js';
import { InputModule } from '../../../../../src/input';

@NgModule({
  declarations: [
    TooltipDemo,
  ],
  imports:[
    TooltipDemoRoutingModule,
    TooltipModule,
    CommonModule,
    FormsModule,
    InputModule,
    HighlightJsModule
  ],
  exports: [
    TooltipDemo,
  ]
})
export class TooltipDemoModule {}
