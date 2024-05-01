import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeadingComponent } from './parts/heading/heading.component';
import { TlSchedule } from './schedule';
import { DayListComponent } from './views/day-list/day-list.component';
import { ViewDayComponent } from './views/day/view-day.component';
import { WeekComponent } from './views/week/week.component';

import { MiscModule } from '../misc/index';
import { NavigatorModule } from '../navigator/index';
import { TooltipModule } from '../tooltip/index';
import { BlockUIModule } from '../blockui/index';
import { ButtonModule } from '../button/index';
import { ButtonGroupModule } from '../buttongroup/index';
import { LoaderModule } from '../loader/index';
import { SplitButtonModule } from '../splitbutton/index';
import { IconsModule } from '../icons/index';

import { GenerateEventsService } from './services/generate-events.service';
import { WorkScaleService } from './services/work-scale.service';
import { EventService } from './services/event.service';
import { HolidayService } from './services/holiday.service';



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
      IconsModule,
      SplitButtonModule
    ],
    declarations: [
      TlSchedule,
      ViewDayComponent,
      WeekComponent,
      DayListComponent,
      HeadingComponent
    ],
    exports: [
      TlSchedule,
    ],
    providers: [
      GenerateEventsService,
      WorkScaleService,
      EventService,
      HolidayService
    ]
})
export class ScheduleModule {}
