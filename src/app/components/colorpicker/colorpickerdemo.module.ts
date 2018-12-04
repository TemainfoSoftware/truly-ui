import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { ColorPickerDemoRoutingModule } from './colorpickerdemo-routing.module';
import { ColorPickerDemoComponent } from './colorpickerdemo.component';
import { ColorPickerModule } from '../../../../projects/truly-ui/src/components/colorpicker';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { ShowcaseHeaderModule } from '../../shared/components/showcase-header/showcase-header.module';


@NgModule({
  declarations: [
    ColorPickerDemoComponent
  ],
  imports: [
    ColorPickerDemoRoutingModule,
    ColorPickerModule,
    CommonModule,
    FormsModule,
    HighlightJsModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule,
    ShowcaseHeaderModule
  ],
  exports: [
    ColorPickerDemoComponent
  ]
})
export class ColorPickerDemoModule {}
