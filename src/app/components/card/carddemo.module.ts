import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { CardDemoRoutingModule } from './carddemo-routing.module';
import { CardDemoComponent } from './carddemo.component';
import { CardModule } from '../../../../projects/truly-ui/src/components/card';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { ShowcaseHeaderModule } from '../../shared/components/showcase-header/showcase-header.module';
import { IconsModule } from '../../../../projects/truly-ui/src/components/icons/index';

@NgModule({
  declarations: [
    CardDemoComponent
  ],
  imports: [
    CardDemoRoutingModule,
    CardModule,
    CommonModule,
    IconsModule,
    FormsModule,
    HighlightJsModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule,
    ShowcaseHeaderModule
  ],
  exports: [
    CardDemoComponent
  ]
})
export class CardDemoModule {}
