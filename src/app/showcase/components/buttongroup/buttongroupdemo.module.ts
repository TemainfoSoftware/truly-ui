import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { ButtonGroupDemoComponent } from './buttongroupdemo.component';
import { ButtonGroupDemoRoutingModule } from './buttongroupdemo-routing.module';
import { ButtonGroupModule } from '../../../components/buttongroup';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';

@NgModule( {
  declarations: [
    ButtonGroupDemoComponent
  ],
  imports: [
    CommonModule,
    ButtonGroupDemoRoutingModule,
    ButtonGroupModule,
    FormsModule,
    HighlightJsModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule
  ],
  exports: [
    ButtonGroupDemoComponent
  ]
})
export class ButtonGroupDemoModule {}
