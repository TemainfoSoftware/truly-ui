import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";

import { PanelDemo } from "./paneldemo.component";
import { PanelGroupModule } from 'truly-ui/panelgroup';
import { InputModule } from 'truly-ui/input';
import { RadioButtonModule } from 'truly-ui/radiobutton'
import { PanelDemoRoutingModule } from "./paneldemo-routing.module";
import { HighlightJsModule } from 'ngx-highlight-js';

@NgModule({
  declarations: [
    PanelDemo
  ],
  imports:[
    CommonModule,
    PanelGroupModule,
    FormsModule,
    RadioButtonModule,
    InputModule,
    PanelDemoRoutingModule,
    HighlightJsModule,
  ],
  exports: [
    PanelDemo
  ]
})
export class PanelDemoModule {}
