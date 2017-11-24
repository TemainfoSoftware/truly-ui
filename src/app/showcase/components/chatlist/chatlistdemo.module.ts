import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { ChatListDemoRoutingModule } from './chatlistdemo-routing.module';
import { ChatListDemoComponent } from './chatlistdemo.component';


import { DumpDataService } from '../../shared/services/dumpdata';
import { ChatListModule } from '../../../components/chatlist';
import { InputModule } from '../../../components/input';
import { ButtonModule } from '../../../components/button';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';

@NgModule( {
  declarations: [
    ChatListDemoComponent
  ],
  imports: [
    ChatListDemoRoutingModule,
    ChatListModule,
    InputModule,
    CommonModule,
    ButtonModule,
    FormsModule,
    HighlightJsModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule
  ],
  exports: [
    ChatListDemoComponent
  ],
  providers: [
    DumpDataService
  ]
} )
export class ChatListDemoModule {
}
