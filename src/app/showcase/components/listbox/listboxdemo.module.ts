import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ListBoxDemoComponent } from './listboxdemo.component';
import { ListBoxDemoRoutingModule } from './listboxdemo-routing.module';
import { HighlightJsModule } from 'ngx-highlight-js';
import { InputModule } from '../../../components/input';
import { ListBoxModule } from '../../../components/listbox';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';

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
    ListBoxModule
  ],
  exports: [
    ListBoxDemoComponent
  ]
})
export class ListBoxDemoModule {}
