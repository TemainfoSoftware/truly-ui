import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { OverlayPanelDemoComponent } from './overlay-paneldemo.component';
import { OverlayPanelDemoRoutingModule } from './overlay-paneldemo-routing.module';
import { HighlightJsModule } from 'ngx-highlight-js';
import { PanelGroupModule } from '../../../components/panelgroup';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { OverlayPanelModule } from '../../../components/overlay-panel/index';
import { ButtonModule } from '../../../components/button/index';

@NgModule({
  declarations: [
    OverlayPanelDemoComponent
  ],
  imports: [
    CommonModule,
    PanelGroupModule,
    FormsModule,
    OverlayPanelModule,
    ButtonModule,
    OverlayPanelDemoRoutingModule,
    HighlightJsModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule
  ],
  exports: [
    OverlayPanelDemoComponent
  ]
})
export class OverlayPanelDemoModule {}
