import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { DropDownListDemoComponent } from './dropdownlistdemo.component';
import { DropDownListDemoRoutingModule } from './dropdownlistdemo-routing.module';
import { DropDownListModule } from '../../../../projects/truly-ui/src/components/dropdownlist';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseReturnedValueModule } from '../../shared/components/showcase-returned-value/showcase-returned-value.module';
import { ShowcaseHeaderModule } from '../../shared/components/showcase-header/showcase-header.module';

@NgModule({
  imports: [
    DropDownListDemoRoutingModule,
    DropDownListModule,
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
    DropDownListDemoComponent
  ],
  exports: [
    DropDownListDemoComponent
  ]
})
export class DropDownListDemoModule { }
