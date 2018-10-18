import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TlStopwatch } from './stopwatch';
import { StopwatchService } from './services/stopwatch-service';

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
export class StopwatchModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StopwatchModule,
      providers: [
        StopwatchService
      ]
    };
  }
}
