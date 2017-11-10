import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { PanelDemoComponent } from './paneldemo.component';
import { PanelDemoRoutingModule } from './paneldemo-routing.module';
import { HighlightJsModule } from 'ngx-highlight-js';
import { PanelGroupModule } from '../../../components/panelgroup';
import { RadioButtonModule } from '../../../components/radiobutton';
import { InputModule } from '../../../components/input';

@NgModule({
  declarations: [
    PanelDemoComponent
  ],
  imports: [
    CommonModule,
    PanelGroupModule,
    FormsModule,
    RadioButtonModule,
    InputModule,
    PanelDemoRoutingModule,
    HighlightJsModule,
  ],
  exports: [
    PanelDemoComponent
  ]
})
export class PanelDemoModule {}
