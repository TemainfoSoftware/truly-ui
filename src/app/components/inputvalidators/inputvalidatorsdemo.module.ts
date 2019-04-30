import { CommonModule  } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { ShowcaseHeaderModule } from '../../shared/components/showcase-header/showcase-header.module';
import {MessageValidationModule} from '../../../../projects/truly-ui/src/components/messagevalidation/index';

@NgModule({
  declarations: [
    InputValidatorsDemoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HighlightJsModule,
    ReactiveFormsModule,
    InputValidatorsDemoRoutingModule,
    InputModule,
    MessageValidationModule,
    ValidatorsModule,
    TooltipModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule,
    ShowcaseReturnedValueModule,
    ShowcaseHeaderModule
  ],
  exports: [
    InputValidatorsDemoComponent
  ]
})
export class InputValidatorsDemoModule {}
