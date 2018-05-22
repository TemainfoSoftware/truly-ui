import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { InputValidatorsDemoComponent } from './inputvalidatorsdemo.component';
import { InputValidatorsDemoRoutingModule } from './inputvalidatorsdemo-routing.module';
import { HighlightJsModule } from 'ngx-highlight-js';
import { InputModule } from '../../../../projects/truly-ui/src/components/input';
import { TooltipModule } from '../../../../projects/truly-ui/src/components/tooltip';
import {ShowcaseCardModule} from '../../shared/components/showcase-card/showcase-card.module';
import {ShowcaseTablePropertiesModule} from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import {ShowcaseTableEventsModule} from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { ValidatorsModule } from '../../../../projects/truly-ui/src/components/validators/index';
import { ShowcaseReturnedValueModule } from '../../shared/components/showcase-returned-value/showcase-returned-value.module';

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
    ValidatorsModule,
    TooltipModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule,
    ShowcaseReturnedValueModule
  ],
  exports: [
    InputValidatorsDemoComponent
  ]
})
export class InputValidatorsDemoModule {}
