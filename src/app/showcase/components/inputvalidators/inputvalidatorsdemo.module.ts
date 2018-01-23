import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { InputValidatorsDemoComponent } from './inputvalidatorsdemo.component';
import { InputValidatorsDemoRoutingModule } from './inputvalidatorsdemo-routing.module';
import { HighlightJsModule } from 'ngx-highlight-js';
import { InputModule } from '../../../components/input';
import { TooltipModule } from '../../../components/tooltip';
import {ShowcaseCardModule} from '../../shared/components/showcase-card/showcase-card.module';
import {ShowcaseTablePropertiesModule} from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import {ShowcaseTableEventsModule} from '../../shared/components/showcase-table-events/showcase-table-events.module';

@NgModule({
  declarations: [
    InputValidatorsDemoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HighlightJsModule,
    InputValidatorsDemoRoutingModule,
    InputModule,
    TooltipModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule,
  ],
  exports: [
    InputValidatorsDemoComponent
  ]
})
export class InputValidatorsDemoModule {}
