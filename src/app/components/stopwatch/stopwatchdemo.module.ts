import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { StopwatchDemoRoutingModule } from './stopwatchdemo-routing.module';
import { StopwatchDemoComponent } from './stopwatchdemo.component';
import { StopwatchModule } from '../../../../projects/truly-ui/src/components/stopwatch';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';

@NgModule({
  declarations: [
    StopwatchDemoComponent
  ],
  imports: [
    StopwatchDemoRoutingModule,
    StopwatchModule,
    CommonModule,
    FormsModule,
    HighlightJsModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule
  ],
  exports: [
    StopwatchDemoComponent
  ]
})
export class StopwatchDemoModule {}
