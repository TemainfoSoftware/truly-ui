import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {HighlightJsModule} from 'ngx-highlight-js';

import { CalendarDemoRoutingModule } from './calendardemo-routing.module';
import { CalendarDemoComponent } from './calendardemo.component';
import { ModalService } from '../../../components/modal';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { CalendarModule } from '../../../components/calendar/index';

@NgModule({
  declarations: [
    CalendarDemoComponent
  ],
  imports: [
    CalendarDemoRoutingModule,
    CalendarModule,
    CommonModule,
    FormsModule,
    HighlightJsModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule
  ],
  exports: [
    CalendarDemoComponent
  ]
})
export class CalendarDemoModule {}
