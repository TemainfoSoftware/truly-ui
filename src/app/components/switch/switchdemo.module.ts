import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SwitchDemoComponent } from './switchdemo.component';
import { SwitchDemoRoutingModule } from './switchdemo-routing.module';
import { HighlightJsModule } from 'ngx-highlight-js';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { SwitchModule } from '../../../../projects/truly-ui/src/components/switch/index';
import { ShowcaseReturnedValueModule } from '../../shared/components/showcase-returned-value/showcase-returned-value.module';
import { ShowcaseHeaderModule } from '../../shared/components/showcase-header/showcase-header.module';

@NgModule( {
  declarations: [
    SwitchDemoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HighlightJsModule,
    SwitchDemoRoutingModule,
    SwitchModule,
    ShowcaseCardModule,
    ShowcaseReturnedValueModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule,
    ShowcaseHeaderModule
  ],
  exports: [
    SwitchDemoComponent
  ]
} )
export class SwitchDemoModule {
}
