import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {HighlightJsModule} from 'ngx-highlight-js';

import {DatePickerDemoRoutingModule} from './datepickerdemo-routing.module';
import {DatePickerDemoComponent} from './datepickerdemo.component';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { DatePickerModule } from '../../../../projects/truly-ui/src/components/datepicker/index';
import { FormsModule } from '@angular/forms';
import { MiscModule } from '../../../../projects/truly-ui/src/components/misc/index';
import { ValidatorsModule } from '../../../../projects/truly-ui/src/components/validators/index';
import { ShowcaseReturnedValueModule } from '../../shared/components/showcase-returned-value/showcase-returned-value.module';
import { ShowcaseHeaderModule } from '../../shared/components/showcase-header/showcase-header.module';
import { DateModule } from '../../../../projects/truly-ui/src/components/date/index';

@NgModule({
  declarations: [
    DatePickerDemoComponent
  ],
  imports: [
    DatePickerModule,
    MiscModule,
    HighlightJsModule,
    CommonModule,
    DateModule,
    FormsModule,
    ValidatorsModule,
    DatePickerDemoRoutingModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule,
    ShowcaseReturnedValueModule,
    ShowcaseHeaderModule
  ],
  exports: [
    DatePickerDemoComponent
  ]
})
export class DatePickerDemoModule {}
