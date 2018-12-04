import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { ButtonDemoRoutingModule } from './buttondemo-routing.module';
import { ButtonDemoComponent } from './buttondemo.component';
import { ButtonModule } from '../../../../projects/truly-ui/src/components/button';
import { IconsModule } from '../../../../projects/truly-ui/src/components/icons';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { ShowcaseHeaderModule } from '../../shared/components/showcase-header/showcase-header.module';

@NgModule({
  declarations: [
    ButtonDemoComponent
  ],
  imports: [
    ButtonDemoRoutingModule,
    ButtonModule,
    IconsModule,
    CommonModule,
    FormsModule,
    HighlightJsModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule,
    ShowcaseHeaderModule
  ],
  exports: [
    ButtonDemoComponent
  ]
})
export class ButtonDemoModule {}
