import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { InputDemoComponent } from './inputdemo.component';
import { InputDemoRoutingModule } from './inputdemo-routing.module';
import { HighlightJsModule } from 'ngx-highlight-js';
import { InputModule } from '../../../components/input';
import { TooltipModule } from '../../../components/tooltip';
import {ShowcaseCardModule} from '../../shared/components/showcase-card/showcase-card.module';
import {ShowcaseTablePropertiesModule} from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import {ShowcaseTableEventsModule} from '../../shared/components/showcase-table-events/showcase-table-events.module';

@NgModule({
  declarations: [
    InputDemoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HighlightJsModule,
    InputDemoRoutingModule,
    InputModule,
    TooltipModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule,
  ],
  exports: [
    InputDemoComponent
  ]
})
export class InputDemoModule {}
