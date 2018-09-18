import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TlTimeline } from './timeline';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    TlTimeline
  ],
  exports: [
    TlTimeline
  ]
})
export class TimelineModule {}
