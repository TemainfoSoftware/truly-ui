import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {HighlightJsModule} from 'ngx-highlight-js';

import {ButtonDemoRoutingModule} from './buttondemo-routing.module';
import {ButtonDemoComponent} from './buttondemo.component';
import { ButtonModule } from '../../../components/button';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';

@NgModule({
  declarations: [
    ButtonDemoComponent
  ],
  imports: [
    ButtonDemoRoutingModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    HighlightJsModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule
  ],
  exports: [
    ButtonDemoComponent
  ]
})
export class ButtonDemoModule {}
