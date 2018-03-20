import { CommonModule  } from '@angular/common';
import { NgModule } from '@angular/core';

import { BlockUIDemoComponent } from './blockuidemo.component';
import { BlockUIDemoRoutingModule } from './blockuidemo-routing.module';
import { HighlightJsModule } from 'ngx-highlight-js';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { BlockUIModule } from '../../../components/blockui/index';
import { SwitchModule } from '../../../components/switch/index';

@NgModule({
  declarations: [
    BlockUIDemoComponent
  ],
  imports: [
    CommonModule,
    BlockUIModule,
    BlockUIDemoRoutingModule,
    SwitchModule,
    HighlightJsModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule
  ],
  exports: [
    BlockUIDemoComponent
  ]
})
export class BlockUIDemoModule {}
