import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HighlightJsModule } from 'ngx-highlight-js';

import { NavigatorDemoComponent } from './navigatordemo.component';
import { NavigatorDemoRoutingModule } from './navigatordemo-routing.module';
import { NavigatorModule } from '../../../../projects/truly-ui/src/components/navigator';

import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { ShowcaseHeaderModule } from '../../shared/components/showcase-header/showcase-header.module';

@NgModule({
  declarations: [
    NavigatorDemoComponent
  ],
  imports: [
    CommonModule,
    NavigatorModule,
    FormsModule,
    NavigatorDemoRoutingModule,
    HighlightJsModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule,
    ShowcaseHeaderModule
  ],
  exports: [
    NavigatorDemoComponent
  ]
})
export class NavigatorDemoModule {}
