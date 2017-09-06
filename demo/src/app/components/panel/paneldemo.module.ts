import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";

import { PanelDemo } from "./paneldemo.component";
import { PanelDemoRoutingModule } from "./paneldemo-routing.module";
import { HighlightJsModule } from 'ngx-highlight-js';

@NgModule({
  declarations: [
    PanelDemo
  ],
  imports:[
    CommonModule,
    FormsModule,
    PanelDemoRoutingModule,
    HighlightJsModule,
  ],
  exports: [
    PanelDemo
  ]
})
export class PanelDemoModule {}
