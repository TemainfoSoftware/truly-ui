import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { ThumbnailDemoRoutingModule } from './thumbnaildemo-routing.module';
import { ThumbnailDemoComponent } from './thumbnaildemo.component';
import { ThumbnailModule } from '../../../../projects/truly-ui/src/components/thumbnail';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { ShowcaseHeaderModule } from '../../shared/components/showcase-header/showcase-header.module';

@NgModule({
  declarations: [
    ThumbnailDemoComponent
  ],
  imports: [
    ThumbnailDemoRoutingModule,
    ThumbnailModule,
    CommonModule,
    FormsModule,
    HighlightJsModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule,
    ShowcaseHeaderModule
  ],
  exports: [
    ThumbnailDemoComponent
  ]
})
export class ThumbnailDemoModule {}
