import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { IconsDemoRoutingModule } from './iconsdemo-routing.module';
import { IconsDemoComponent } from './iconsdemo.component';
import { IconsModule } from '../../../../../projects/truly-ui/src/components/icons';
import { InputModule } from '../../../../../projects/truly-ui/src/components/input';
import { SwitchModule } from '../../../../../projects/truly-ui/src/components/switch';
import { ShowcaseCardModule } from '../../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../../shared/components/showcase-table-events/showcase-table-events.module';
import { ShowcaseHeaderModule } from '../../../shared/components/showcase-header/showcase-header.module';

@NgModule({
  declarations: [
    IconsDemoComponent
  ],
  imports: [
    IconsDemoRoutingModule,
    IconsModule,
    InputModule,
    SwitchModule,
    CommonModule,
    FormsModule,
    HighlightJsModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule,
    ShowcaseHeaderModule
  ],
  exports: [
    IconsDemoComponent
  ]
})
export class IconsDemoModule {}
