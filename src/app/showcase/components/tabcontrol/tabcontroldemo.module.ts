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
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';

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
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule
  ],
  exports: [
    TabControlDemoComponent
  ]
})
export class TabControlDemoModule {}
