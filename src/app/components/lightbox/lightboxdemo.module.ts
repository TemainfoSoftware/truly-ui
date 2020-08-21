import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { LightboxDemoRoutingModule } from './lightboxdemo-routing.module';
import { LightboxDemoComponent } from './lightboxdemo.component';
import { LightboxModule } from '../../../../projects/truly-ui/src/components/lightbox';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { ShowcaseHeaderModule } from '../../shared/components/showcase-header/showcase-header.module';

@NgModule({
  declarations: [
    LightboxDemoComponent
  ],
  imports: [
    LightboxDemoRoutingModule,
    LightboxModule,
    CommonModule,
    FormsModule,
    HighlightJsModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule,
    ShowcaseHeaderModule
  ],
  exports: [
    LightboxDemoComponent
  ]
})
export class LightboxDemoModule {}
