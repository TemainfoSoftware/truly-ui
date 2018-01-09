import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TlCalendar } from './calendar';
import { TabIndexService } from '../form/tabIndex.service';
import { IdGeneratorService } from '../core/helper/idgenerator.service';
import { NameGeneratorService } from '../core/helper/namegenerator.service';
import { DirectiveModule } from '../core/directives/index';

export * from './calendar';

@NgModule({
    imports: [
        CommonModule,
        DirectiveModule,
    ],
    declarations: [
        TlCalendar,
    ],
    exports: [
        TlCalendar,
    ],
    providers: [
        TabIndexService,
        IdGeneratorService,
        NameGeneratorService,
    ]
})
export class CalendarModule {}
