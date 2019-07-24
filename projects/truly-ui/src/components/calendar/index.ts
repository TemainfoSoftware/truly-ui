import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TlCalendar } from './calendar';
import { TlCalendarDays } from './parts/calendar-days';
import { TlCalendarMonths } from './parts/calendar-months';
import { TlCalendarYears } from './parts/calendar-years';

import { MiscModule } from '../misc/index';
import { NavigatorModule } from '../navigator/index';
import { TooltipModule } from '../tooltip/index';

@NgModule({
    imports: [
        CommonModule,
        MiscModule,
        NavigatorModule,
        TooltipModule
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
    entryComponents: [
        TlCalendarDays,
        TlCalendarMonths,
        TlCalendarYears
    ]
})
export class CalendarModule {}
