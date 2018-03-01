import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { PanelDemoComponent } from './paneldemo.component';
import { PanelDemoRoutingModule } from './paneldemo-routing.module';
import { HighlightJsModule } from 'ngx-highlight-js';
import { PanelGroupModule } from '../../../components/panelgroup';
import { RadioButtonModule } from '../../../components/radiobutton';
import { InputModule } from '../../../components/input';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { FormModule } from '../../../components/form/index';

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
    ShowcaseTableEventsModule
  ],
  exports: [
    PanelDemoComponent
  ]
})
export class PanelDemoModule {}
