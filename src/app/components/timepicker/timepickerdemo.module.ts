import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { TimepickerDemoRoutingModule } from './timepickerdemo-routing.module';
import { TimepickerDemoComponent } from './timepickerdemo.component';
import { TimePickerModule } from '../../../../projects/truly-ui/src/components/timepicker';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';

@NgModule({
  declarations: [
    TimepickerDemoComponent
  ],
  imports: [
    TimepickerDemoRoutingModule,
    TimePickerModule,
    CommonModule,
    FormsModule,
    HighlightJsModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule
  ],
  exports: [
    TimepickerDemoComponent
  ]
})
export class TimepickerDemoModule {}
