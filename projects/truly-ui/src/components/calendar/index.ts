import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TlCalendar } from './calendar';
import { TabIndexService } from '../form/tabIndex.service';
import { IdGeneratorService } from '../core/helper/idgenerator.service';
import { NameGeneratorService } from '../core/helper/namegenerator.service';
import { TlCalendarDays } from './parts/calendar-days';
import { TlCalendarMonths } from './parts/calendar-months';
import { TlCalendarYears } from './parts/calendar-years';

import { MiscModule } from '../misc/index';
import { NavigatorModule } from '../navigator/index';

@NgModule({
    imports: [
        CommonModule,
        MiscModule,
        NavigatorModule
    ],
    declarations: [
        TlCalendar,
        TlCalendarDays,
        TlCalendarMonths,
        TlCalendarYears
    ],
    exports: [
        TlCalendar,
        TlCalendarDays,
        TlCalendarMonths,
        TlCalendarYears
    ],
    providers: [
        TabIndexService,
        IdGeneratorService,
        NameGeneratorService,
    ],
    entryComponents: [
        TlCalendarDays,
        TlCalendarMonths,
        TlCalendarYears
    ]
})
export class CalendarModule {}
