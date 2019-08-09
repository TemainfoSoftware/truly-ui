import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TlCalendar } from './calendar';

import { NavigatorModule } from '../navigator/index';
import { TooltipModule } from '../tooltip/index';
import { ButtonModule } from '../button/index';
import { TlCalendarDays } from './parts/calendar-days/calendar-days';
import { TlCalendarMonths } from './parts/calendar-months/calendar-months';
import { TlCalendarYears } from './parts/calendar-years/calendar-years';

@NgModule({
    imports: [
        CommonModule,
        NavigatorModule,
        TooltipModule,
        ButtonModule
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
    ]
})
export class CalendarModule {}
