import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { SkeletondemoRoutingModule } from './skeletondemo-routing.module';
import { SkeletondemoComponent } from './skeletondemo.component';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { ShowcaseHeaderModule } from '../../shared/components/showcase-header/showcase-header.module';
import { SkeletonModule } from '../../../../projects/truly-ui/src/components/skeleton';

@NgModule({
  declarations: [
    SkeletondemoComponent
  ],
  imports: [
    SkeletondemoRoutingModule,
    SkeletonModule,
    CommonModule,
    FormsModule,
    HighlightJsModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule,
    ShowcaseHeaderModule
  ],
  exports: [
    SkeletondemoComponent
  ]
})
export class SkeletondemoModule {}
