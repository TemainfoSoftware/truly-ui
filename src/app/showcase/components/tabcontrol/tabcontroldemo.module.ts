import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { TabControlDemoComponent } from './tabcontroldemo.component';
import { TabControlDemoRoutingModule } from './tabcontroldemo-routing.module';
import { HighlightJsModule } from 'ngx-highlight-js';
import { PanelGroupModule } from '../../../components/panelgroup';
import { RadioButtonModule } from '../../../components/radiobutton';
import { InputModule } from '../../../components/input';
import { TabControlModule } from '../../../components/tabcontrol/index';

@NgModule({
  declarations: [
    TabControlDemoComponent
  ],
  imports: [
    CommonModule,
    PanelGroupModule,
    FormsModule,
    TabControlModule,
    RadioButtonModule,
    InputModule,
    TabControlDemoRoutingModule,
    HighlightJsModule,
  ],
  exports: [
    TabControlDemoComponent
  ]
})
export class TabControlDemoModule {}
