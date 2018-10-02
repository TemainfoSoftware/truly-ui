import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TlTimeline } from './timeline';
import { TlTimelineItem } from './parts/timeline-item/timeline-item';
import { TimelineService } from './services/timeline-service';

import { BlockUIModule } from '../blockui/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BlockUIModule
  ],
  declarations: [
    TlTimeline,
    TlTimelineItem
  ],
  providers: [
    TimelineService
  ],
  exports: [
    TlTimeline,
    TlTimelineItem
  ]
})
export class TimelineModule {}
