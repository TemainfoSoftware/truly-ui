import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ToolbarDemoComponent } from './toolbardemo.component';
import { ToolbarDemoRoutingModule } from './toolbardemo-routing.module';
import { HighlightJsModule } from 'ngx-highlight-js';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { ToolbarModule } from '../../../../projects/truly-ui/src/components/toolbar/index';
import { ShowcaseHeaderModule } from '../../shared/components/showcase-header/showcase-header.module';

@NgModule({
  declarations: [
    ToolbarDemoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ToolbarModule,
    ToolbarDemoRoutingModule,
    HighlightJsModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule,
    ShowcaseHeaderModule
  ],
  exports: [
    ToolbarDemoComponent
  ]
})
export class ToolbarDemoModule {}
