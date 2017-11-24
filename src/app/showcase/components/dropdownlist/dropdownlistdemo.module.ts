import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { DropDownListDemoComponent } from './dropdownlistdemo.component';
import { DropDownListDemoRoutingModule } from './dropdownlistdemo-routing.module';
import { DropDownListModule } from '../../../components/dropdownlist';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';

@NgModule({
  declarations: [
    DropDownListDemoComponent
  ],
  imports: [
    DropDownListDemoRoutingModule,
    DropDownListModule,
    ShowcaseCardModule,
    ShowcaseTableEventsModule,
    ShowcaseTablePropertiesModule,
    CommonModule,
    FormsModule,
    HighlightJsModule
  ],
  exports: [
    DropDownListDemoComponent
  ]
})
export class DropDownListDemoModule { }
