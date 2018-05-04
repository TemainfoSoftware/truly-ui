import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabIndexService } from '../form/tabIndex.service';
import { IdGeneratorService } from '../core/helper/idgenerator.service';
import { NameGeneratorService } from '../core/helper/namegenerator.service';
import { MiscModule } from '../misc/index';
import { NavigatorModule } from '../navigator/index';
import { TooltipModule } from '../tooltip';
import { TlSchedule } from './schedule';

export * from './schedule';

@NgModule({
    imports: [
      CommonModule,
      MiscModule,
      NavigatorModule,
      TooltipModule
    ],
    declarations: [
      TlSchedule,
    ],
    exports: [
      TlSchedule,
    ],
    providers: [
      TabIndexService,
      IdGeneratorService,
      NameGeneratorService,
    ]
})
export class ScheduleModule {}
