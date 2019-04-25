import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { ChatListDemoRoutingModule } from './chatlistdemo-routing.module';
import { ChatListDemoComponent } from './chatlistdemo.component';


import { DumpDataService } from '../../shared/services/dumpdata';
import { ChatListModule } from '../../../../projects/truly-ui/src/components/chatlist';
import { InputModule } from '../../../../projects/truly-ui/src/components/input';
import { ButtonModule } from '../../../../projects/truly-ui/src/components/button';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { ShowcaseHeaderModule } from '../../shared/components/showcase-header/showcase-header.module';
import { Chat2Module } from './chat2/chat2.module';
import { Chat3Module } from './chat3/chat3.module';

@NgModule( {
  declarations: [
    ChatListDemoComponent,
  ],
  imports: [
    ChatListDemoRoutingModule,
    Chat2Module,
    Chat3Module,
    InputModule,
    CommonModule,
    ButtonModule,
    FormsModule,
    HighlightJsModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule,
    ShowcaseHeaderModule
  ],
  exports: [
    ChatListDemoComponent
  ],
  providers: [
    DumpDataService,
  ]
} )
export class ChatListDemoModule {
}
