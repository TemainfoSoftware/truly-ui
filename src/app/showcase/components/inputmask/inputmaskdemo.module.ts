import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { InputMaskDemoComponent } from './inputmaskdemo.component';
import { InputMaskDemoRoutingModule } from './inputmaskdemo-routing.module';
import { InputModule } from '../../../components/input';
import { TooltipModule } from '../../../components/tooltip';
import {ShowcaseCardModule} from '../../shared/components/showcase-card/showcase-card.module';
import {ShowcaseTablePropertiesModule} from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import {ShowcaseTableEventsModule} from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { ShowcaseReturnedValueModule } from '../../shared/components/showcase-returned-value/showcase-returned-value.module';

@NgModule({
  declarations: [
    InputMaskDemoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HighlightJsModule,
    InputMaskDemoRoutingModule,
    InputModule,
    TooltipModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule,
    ShowcaseReturnedValueModule
  ],
  exports: [
    InputMaskDemoComponent
  ]
})
export class InputMaskDemoModule {}
