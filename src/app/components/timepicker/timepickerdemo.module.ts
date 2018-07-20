import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { TimePickerdemoComponent } from './timepickerdemo.component';
import { TimePickerDemoRoutingModule } from './timepickerdemo-routing.module';
import { TimePickerModule } from '../../../../projects/truly-ui/src/components/timepicker/index';
import { ShowcaseReturnedValueModule } from '../../shared/components/showcase-returned-value/showcase-returned-value.module';

@NgModule({
  declarations: [
    TimePickerdemoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TimePickerModule,
    HighlightJsModule,
    ShowcaseCardModule,
    TimePickerDemoRoutingModule,
    ShowcaseTablePropertiesModule,
    ShowcaseReturnedValueModule,
    ShowcaseTableEventsModule
  ],
  exports: [
    TimePickerdemoComponent
  ]
})
export class TimePickerDemoModule {}
