import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { BadgedemoRoutingModule } from './badgedemo-routing.module';
import { BadgedemoComponent } from './badgedemo.component';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { BadgeModule } from '../../../../projects/truly-ui/src/components/badge';

@NgModule({
  declarations: [
    BadgedemoComponent
  ],
  imports: [
    BadgedemoRoutingModule,
    BadgeModule,
    CommonModule,
    FormsModule,
    HighlightJsModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule
  ],
  exports: [
    BadgedemoComponent
  ]
})
export class BadgedemoModule {}
