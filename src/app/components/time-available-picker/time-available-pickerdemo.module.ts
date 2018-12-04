import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { TimeAvailablePickerDemoRoutingModule } from './time-available-pickerdemo-routing.module';
import { TimeAvailablePickerDemoComponent } from './time-available-pickerdemo.component';
import { TimeAvailablePickerModule } from '../../../../projects/truly-ui/src/components/time-available-picker';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { ShowcaseHeaderModule } from '../../shared/components/showcase-header/showcase-header.module';

@NgModule({
  declarations: [
    TimeAvailablePickerDemoComponent
  ],
  imports: [
    TimeAvailablePickerDemoRoutingModule,
    TimeAvailablePickerModule,
    CommonModule,
    FormsModule,
    HighlightJsModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule,
    ShowcaseHeaderModule
  ],
  exports: [
    TimeAvailablePickerDemoComponent
  ]
})
export class TimeAvailablePickerDemoModule {}
