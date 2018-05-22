import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { MultiSelectDemoComponent } from './multiselectdemo.component';
import { MultiSelectDemoRoutingModule } from './multiselectdemo-routing.module';
import { HighlightJsModule } from 'ngx-highlight-js';
import { MultiSelectModule } from '../../../../projects/truly-ui/src/components/multiselect';
import { DialogModule } from '../../../../projects/truly-ui/src/components/dialog';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';

@NgModule({
  declarations: [
    MultiSelectDemoComponent
  ],
  imports: [
    CommonModule,
    MultiSelectModule,
    FormsModule,
    DialogModule,
    ShowcaseCardModule,
    ShowcaseTableEventsModule,
    ShowcaseTablePropertiesModule,
    HighlightJsModule,
    MultiSelectDemoRoutingModule,
  ],
  exports: [
    MultiSelectDemoComponent
  ]
})
export class MultiSelectDemoModule {}
