import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { OverlayPanelDemoComponent } from './overlay-paneldemo.component';
import { OverlayPanelDemoRoutingModule } from './overlay-paneldemo-routing.module';
import { HighlightJsModule } from 'ngx-highlight-js';
import { PanelGroupModule } from '../../../../projects/truly-ui/src/components/panelgroup';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { OverlayPanelModule } from '../../../../projects/truly-ui/src/components/overlaypanel/index';
import { ButtonModule } from '../../../../projects/truly-ui/src/components/button/index';
import { ShowcaseHeaderModule } from '../../shared/components/showcase-header/showcase-header.module';

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
    ShowcaseTableEventsModule,
    ShowcaseHeaderModule
  ],
  exports: [
    OverlayPanelDemoComponent
  ]
})
export class OverlayPanelDemoModule {}
