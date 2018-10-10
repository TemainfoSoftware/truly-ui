import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TlStopwatch } from './stopwatch';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    TlStopwatch
  ],
  exports: [
    TlStopwatch
  ]
})
export class StopwatchModule {}
