import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { PopupMenuDemoRoutingModule } from './popupmenudemo-routing.module';
import { PopupMenuDemoComponent } from './popupmenudemo.component';
import { ButtonModule } from '../../../../projects/truly-ui/src/components/button';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { PopupMenuModule } from '../../../../projects/truly-ui/src/components/popupmenu/index';
import { ShowcaseHeaderModule } from '../../shared/components/showcase-header/showcase-header.module';

@NgModule( {
  declarations: [
    PopupMenuDemoComponent
  ],
  imports: [
    PopupMenuDemoRoutingModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    PopupMenuModule,
    HighlightJsModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule,
    ShowcaseHeaderModule
  ],
  exports: [
    PopupMenuDemoComponent
  ]
} )
export class PopupMenuDemoModule {
}
