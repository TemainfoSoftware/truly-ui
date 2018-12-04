import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { TabControlDemoComponent } from './tabcontroldemo.component';
import { TabControlDemoRoutingModule } from './tabcontroldemo-routing.module';
import { HighlightJsModule } from 'ngx-highlight-js';
import { PanelGroupModule } from '../../../../projects/truly-ui/src/components/panelgroup';
import { RadioButtonModule } from '../../../../projects/truly-ui/src/components/radiobutton';
import { InputModule } from '../../../../projects/truly-ui/src/components/input';
import { TabControlModule } from '../../../../projects/truly-ui/src/components/tabcontrol/index';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { ShowcaseHeaderModule } from '../../shared/components/showcase-header/showcase-header.module';

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
    ShowcaseTableEventsModule,
    ShowcaseHeaderModule
  ],
  exports: [
    TabControlDemoComponent
  ]
})
export class TabControlDemoModule {}
