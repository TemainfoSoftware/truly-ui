import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeadingComponent } from './parts/heading/heading.component';
import { TlSchedule } from './schedule';
import { DayListComponent } from './views/day-list/day-list.component';
import { ViewDayComponent } from './views/day/view-day.component';

import { MiscModule } from '../misc/index';
import { NavigatorModule } from '../navigator/index';
import { TooltipModule } from '../tooltip/index';
import { BlockUIModule } from '../blockui/index';
import { ButtonModule } from '../button/index';
import { ButtonGroupModule } from '../buttongroup/index';
import { LoaderModule } from '../loader/index';

import { GenerateEventsService } from './services/generate-events.service';
import { WorkScaleService } from './services/work-scale.service';
import { EventService } from './services/event.service';
import {SplitButtonModule} from '../splitbutton/index';


@NgModule({
    imports: [
      CommonModule,
      MiscModule,
      NavigatorModule,
      TooltipModule,
      ButtonGroupModule,
      BlockUIModule,
      ButtonModule,
      LoaderModule,
      SplitButtonModule
    ],
    declarations: [
      TlSchedule,
      ViewDayComponent,
      DayListComponent,
      HeadingComponent
    ],
    exports: [
      TlSchedule,
    ],
    providers: [
      GenerateEventsService,
      WorkScaleService,
      EventService
    ]
})
export class ScheduleModule {}
