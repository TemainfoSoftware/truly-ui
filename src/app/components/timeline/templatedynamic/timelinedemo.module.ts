import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { TimelineDemoRoutingModule } from './timelinedemo-routing.module';
import { TimelineDemoComponent } from './timelinedemo.component';
import { TimelineModule } from '../../../../../projects/truly-ui/src/components/timeline';
import { ShowcaseCardModule } from '../../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../../shared/components/showcase-table-events/showcase-table-events.module';
import { RepeatComponent } from './repeat-component';

@NgModule({
  declarations: [
    TimelineDemoComponent,
    RepeatComponent
  ],
  imports: [
    TimelineDemoRoutingModule,
    TimelineModule,
    CommonModule,
    FormsModule,
    HighlightJsModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule
  ],
  exports: [
    TimelineDemoComponent,
    RepeatComponent
  ]
})
export class TimelineDemoModule {}
