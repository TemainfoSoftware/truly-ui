import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { DropDownIconDemoComponent } from './dropdownicondemo.component';
import { DropDownIconDemoRoutingModule } from './dropdownicondemo-routing.module';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseReturnedValueModule } from '../../shared/components/showcase-returned-value/showcase-returned-value.module';
import { DropDownIconModule } from '../../../../projects/truly-ui/src/components/dropdownicon/index';
import { ShowcaseHeaderModule } from '../../shared/components/showcase-header/showcase-header.module';

@NgModule({
  imports: [
    DropDownIconDemoRoutingModule,
    DropDownIconModule,
    CommonModule,
    FormsModule,
    HighlightJsModule,
    ShowcaseCardModule,
    ShowcaseTableEventsModule,
    ShowcaseTablePropertiesModule,
    ShowcaseReturnedValueModule,
    ShowcaseHeaderModule
  ],
  declarations: [
    DropDownIconDemoComponent
  ],
  exports: [
    DropDownIconDemoComponent
  ]
})
export class DropDownIconDemoModule { }
