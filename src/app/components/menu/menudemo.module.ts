import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {HighlightJsModule} from 'ngx-highlight-js';

import { MenuDemoRoutingModule } from './menudemo-routing.module';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { MenuDemoComponent } from './menudemo.component';
import { SwitchModule } from '../../../../projects/truly-ui/src/components/switch/index';
import { MenuModule } from '../../../../projects/truly-ui/src/components/menu/index';
import { ShowcaseHeaderModule } from '../../shared/components/showcase-header/showcase-header.module';

@NgModule({
  declarations: [
    MenuDemoComponent
  ],
  imports: [
    MenuDemoRoutingModule,
    MenuModule,
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
    MenuDemoComponent
  ]
})
export class MenuDemoModule {}
