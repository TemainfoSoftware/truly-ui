import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { BadgeDemoRoutingModule } from './badgedemo-routing.module';
import { BadgeDemoComponent } from './badgedemo.component';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { BadgeModule } from '../../../../projects/truly-ui/src/components/badge';
import { SwitchModule } from '../../../../projects/truly-ui/src/components/switch';
import { ButtonModule } from '../../../../projects/truly-ui/src/components/button';
import { ButtonGroupModule } from '../../../../projects/truly-ui/src/components/buttongroup';
import { IconsModule } from '../../../../projects/truly-ui/src/components/icons';
import { ShowcaseHeaderModule } from '../../shared/components/showcase-header/showcase-header.module';

@NgModule({
  declarations: [
    BadgeDemoComponent
  ],
  imports: [
    BadgeDemoRoutingModule,
    BadgeModule,
    ButtonModule,
    ButtonGroupModule,
    IconsModule,
    CommonModule,
    FormsModule,
    SwitchModule,
    HighlightJsModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule,
    ShowcaseHeaderModule
  ],
  exports: [
    BadgeDemoComponent
  ]
})
export class BadgeDemoModule {}
