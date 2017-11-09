import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { ChatListModule } from 'truly-ui/chatlist';

import { ChatListDemoRoutingModule } from './chatlistdemo-routing.module';
import { ChatListDemoComponent } from './chatlistdemo.component';
import { InputModule } from 'truly-ui/input';
import { ButtonModule } from 'truly-ui/button';

import { DumpDataService } from '../../shared/services/dumpdata';

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
    HighlightJsModule
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
