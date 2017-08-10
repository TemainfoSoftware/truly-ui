import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";

import { InputModule } from 'truly-ui/input';
import { TooltipModule } from 'truly-ui/tooltip';
import { TooltipDemo } from "./tooltipdemo.component";
import { TooltipDemoRoutingModule } from "./tooltipdemo-routing.module";
import { HighlightJsModule } from 'ngx-highlight-js';

@NgModule({
  declarations: [
    TooltipDemo,
  ],
  imports:[
    CommonModule,
    FormsModule,
    HighlightJsModule,
    InputModule,
    TooltipDemoRoutingModule,
    TooltipModule
  ],
  exports: [
    TooltipDemo,
  ]
})
export class TooltipDemoModule {}
