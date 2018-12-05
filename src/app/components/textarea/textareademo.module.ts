import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { TextareaDemoRoutingModule } from './textareademo-routing.module';
import { TextareaDemoComponent } from './textareademo.component';
import { InputModule } from '../../../../projects/truly-ui/src/components/input';
import { TextareaModule } from '../../../../projects/truly-ui/src/components/textarea';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { ShowcaseHeaderModule } from '../../shared/components/showcase-header/showcase-header.module';

@NgModule({
  declarations: [
    TextareaDemoComponent
  ],
  imports: [
    TextareaDemoRoutingModule,
    InputModule,
    TextareaModule,
    CommonModule,
    FormsModule,
    HighlightJsModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule,
    ShowcaseHeaderModule
  ],
  exports: [
    TextareaDemoComponent
  ]
})
export class TextareaDemoModule {}
