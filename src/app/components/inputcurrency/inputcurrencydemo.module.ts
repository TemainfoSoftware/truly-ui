import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { InputCurrencyDemoRoutingModule } from './inputcurrencydemo-routing.module';
import { InputCurrencyDemoComponent } from './inputcurrencydemo.component';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { InputModule } from '../../../../projects/truly-ui/src/components/input/index';
import { ShowcaseReturnedValueModule } from '../../shared/components/showcase-returned-value/showcase-returned-value.module';
import { ShowcaseHeaderModule } from '../../shared/components/showcase-header/showcase-header.module';

@NgModule({
  declarations: [
    InputCurrencyDemoComponent
  ],
  imports: [
    InputCurrencyDemoRoutingModule,
    InputModule,
    CommonModule,
    FormsModule,
    HighlightJsModule,
    ShowcaseReturnedValueModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule,
    ShowcaseHeaderModule
  ],
  exports: [
    InputCurrencyDemoComponent
  ]
})
export class InputCurrencyDemoModule {}
