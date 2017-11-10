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
