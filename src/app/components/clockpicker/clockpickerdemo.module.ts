import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { ClockPickerdemoComponent } from './clockpickerdemo.component';
import { ClockPickerDemoRoutingModule } from './clockpickerdemo-routing.module';
import { ShowcaseReturnedValueModule } from '../../shared/components/showcase-returned-value/showcase-returned-value.module';
import { ClockPickerModule } from '../../../../projects/truly-ui/src/components/clockpicker/index';
import { ShowcaseHeaderModule } from '../../shared/components/showcase-header/showcase-header.module';

@NgModule({
  declarations: [
    ClockPickerdemoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ClockPickerModule,
    HighlightJsModule,
    ShowcaseCardModule,
    ClockPickerDemoRoutingModule,
    ShowcaseTablePropertiesModule,
    ShowcaseReturnedValueModule,
    ShowcaseTableEventsModule,
    ShowcaseHeaderModule
  ],
  exports: [
    ClockPickerdemoComponent
  ]
})
export class ClockPickerDemoModule {}
