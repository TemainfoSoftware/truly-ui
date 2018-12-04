import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { PanelDemoComponent } from './paneldemo.component';
import { PanelDemoRoutingModule } from './paneldemo-routing.module';
import { HighlightJsModule } from 'ngx-highlight-js';
import { PanelGroupModule } from '../../../../projects/truly-ui/src/components/panelgroup';
import { RadioButtonModule } from '../../../../projects/truly-ui/src/components/radiobutton';
import { InputModule } from '../../../../projects/truly-ui/src/components/input';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { FormModule } from '../../../../projects/truly-ui/src/components/form/index';
import { ShowcaseHeaderModule } from '../../shared/components/showcase-header/showcase-header.module';

@NgModule({
  declarations: [
    PanelDemoComponent
  ],
  imports: [
    CommonModule,
    PanelGroupModule,
    FormsModule,
    FormModule,
    RadioButtonModule,
    InputModule,
    PanelDemoRoutingModule,
    HighlightJsModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule,
    ShowcaseHeaderModule
  ],
  exports: [
    PanelDemoComponent
  ]
})
export class PanelDemoModule {}
