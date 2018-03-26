import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {HighlightJsModule} from 'ngx-highlight-js';

import { MenuListDemoRoutingModule } from './menulistdemo-routing.module';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { MenuListDemoComponent } from './menulistdemo.component';
import { MenuListModule } from '../../../components/menulist/index';
import { SwitchModule } from '../../../components/switch/index';

@NgModule({
  declarations: [
    MenuListDemoComponent
  ],
  imports: [
    MenuListDemoRoutingModule,
    MenuListModule,
    SwitchModule,
    CommonModule,
    FormsModule,
    HighlightJsModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule
  ],
  exports: [
    MenuListDemoComponent
  ]
})
export class MenuListDemoModule {}
