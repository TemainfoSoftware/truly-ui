import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {HighlightJsModule} from 'ngx-highlight-js';

import {ShortcutDemoRoutingModule} from './shortcutdemo-routing.module';
import {ShortcutDemoComponent} from './shortcutdemo.component';
import { ButtonModule } from '../../../../projects/truly-ui/src/components/button';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { MiscModule } from '../../../../projects/truly-ui/src/components/misc/index';
import { DialogModule } from '../../../../projects/truly-ui/src/components/dialog/index';

@NgModule({
  declarations: [
    ShortcutDemoComponent
  ],
  imports: [
    ShortcutDemoRoutingModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    MiscModule,
    DialogModule,
    HighlightJsModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule
  ],
  exports: [
    ShortcutDemoComponent
  ]
})
export class ShortcutDemoModule {}
