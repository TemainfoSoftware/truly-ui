import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';
import { ScheduleModule } from '../../../../../projects/truly-ui/src/components/schedule';
import { ShowcaseCardModule } from '../../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTableEventsModule } from '../../../shared/components/showcase-table-events/showcase-table-events.module';
import { ShowcaseTablePropertiesModule } from '../../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ScheduleDemoOverviewRoutingModule } from './scheduledemo-overview-routing.module';
import { ScheduleDemoOverviewComponent } from './scheduledemo-overview.component';
import { ShowcaseHeaderModule } from '../../../shared/components/showcase-header/showcase-header.module';
import { ContextMenuService } from '../../../../../projects/truly-ui/src/components/contextmenu/services/contextmenu.service';
import { ContextMenuModule } from '../../../../../projects/truly-ui/src/components/contextmenu';
import { SplitButtonModule } from '../../../../../projects/truly-ui/src/components/splitbutton';

@NgModule({
  imports: [
    ScheduleDemoOverviewRoutingModule,
    ScheduleModule,
    CommonModule,
    FormsModule,
    HighlightJsModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule,
    ShowcaseHeaderModule,
    ContextMenuModule,
    SplitButtonModule
  ],
  declarations: [
    ScheduleDemoOverviewComponent,
  ],
  providers: [
    ContextMenuService
  ],
  exports: [
    ScheduleDemoOverviewComponent
  ]
})
export class ScheduledemoOverviewModule {}
