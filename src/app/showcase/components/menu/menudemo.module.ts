import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {HighlightJsModule} from 'ngx-highlight-js';

import { MenuDemoRoutingModule } from './menudemo-routing.module';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { MenuDemoComponent } from './menudemo.component';
import { SwitchModule } from '../../../components/switch/index';
import { MenuModule } from '../../../components/menu/index';

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
    ShowcaseTableEventsModule
  ],
  exports: [
    MenuDemoComponent
  ]
})
export class MenuDemoModule {}
