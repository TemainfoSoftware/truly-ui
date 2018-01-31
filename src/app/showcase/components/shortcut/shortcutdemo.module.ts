import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {HighlightJsModule} from 'ngx-highlight-js';

import {ShortcutDemoRoutingModule} from './shortcutdemo-routing.module';
import {ShortcutDemoComponent} from './shortcutdemo.component';
import { ButtonModule } from '../../../components/button';
import { ModalService } from '../../../components/modal';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { DirectiveModule } from '../../../components/core/directives/index';
import { DialogModule } from '../../../components/dialog/index';

@NgModule({
  declarations: [
    ShortcutDemoComponent
  ],
  imports: [
    ShortcutDemoRoutingModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    DirectiveModule,
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
