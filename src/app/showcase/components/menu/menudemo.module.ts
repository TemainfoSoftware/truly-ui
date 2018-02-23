import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {HighlightJsModule} from 'ngx-highlight-js';

import { MenuDemoRoutingModule } from './menudemo-routing.module';
import { MenuDemoComponent } from './menudemo.component';
import { ButtonModule } from '../../../components/button';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { MenuModule } from '../../../components/menu/index';

@NgModule({
  declarations: [
    MenuDemoComponent
  ],
  imports: [
    MenuDemoRoutingModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    MenuModule,
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
