import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CheckBoxDemoComponent } from './checkboxdemo.component';
import { CheckBoxDemoRoutingModule } from './checkboxdemo-routing.module';
import { HighlightJsModule } from 'ngx-highlight-js';
import { CheckBoxModule } from '../../../../projects/truly-ui/src/components/checkbox';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { ShowcaseHeaderModule } from '../../shared/components/showcase-header/showcase-header.module';

@NgModule({
  declarations: [
    CheckBoxDemoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HighlightJsModule,
    CheckBoxDemoRoutingModule,
    CheckBoxModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule,
    ShowcaseHeaderModule
  ],
  exports: [
    CheckBoxDemoComponent
  ]
})
export class CheckBoxDemoModule {}
