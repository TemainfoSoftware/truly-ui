import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


import { TooltipDemoComponent } from './tooltipdemo.component';
import { TooltipDemoRoutingModule } from './tooltipdemo-routing.module';
import { HighlightJsModule } from 'ngx-highlight-js';
import { InputModule } from '../../../../projects/truly-ui/src/components/input';
import { TooltipModule } from '../../../../projects/truly-ui/src/components/tooltip';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { ShowcaseHeaderModule } from '../../shared/components/showcase-header/showcase-header.module';

@NgModule({
  declarations: [
    TooltipDemoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HighlightJsModule,
    InputModule,
    TooltipDemoRoutingModule,
    TooltipModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule,
    ShowcaseHeaderModule
  ],
  exports: [
    TooltipDemoComponent,
  ]
})
export class TooltipDemoModule {}
