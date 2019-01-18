import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { DateDemoRoutingModule } from './datedemo-routing.module';
import { DateDemoComponent } from './datedemo.component';
import { DateModule } from '../../../../projects/truly-ui/src/components/date';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { ShowcaseHeaderModule } from '../../shared/components/showcase-header/showcase-header.module';

@NgModule({
  declarations: [
    DateDemoComponent
  ],
  imports: [
    DateDemoRoutingModule,
    DateModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HighlightJsModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule,
    ShowcaseHeaderModule
  ],
  exports: [
    DateDemoComponent
  ]
})
export class DateDemoModule {}
