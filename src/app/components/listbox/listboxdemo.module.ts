import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ListBoxDemoComponent } from './listboxdemo.component';
import { ListBoxDemoRoutingModule } from './listboxdemo-routing.module';
import { HighlightJsModule } from 'ngx-highlight-js';
import { InputModule } from '../../../../projects/truly-ui/src/components/input';
import { ListBoxModule } from '../../../../projects/truly-ui/src/components/listbox';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseHeaderModule } from '../../shared/components/showcase-header/showcase-header.module';

@NgModule({
  declarations: [
    ListBoxDemoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InputModule,
    HighlightJsModule,
    ShowcaseTableEventsModule,
    ShowcaseTablePropertiesModule,
    ShowcaseCardModule,
    ListBoxDemoRoutingModule,
    ListBoxModule,
    ShowcaseHeaderModule
  ],
  exports: [
    ListBoxDemoComponent
  ],
})
export class ListBoxDemoModule {}
