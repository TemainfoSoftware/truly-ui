import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListBoxModule } from '../listbox/index';
import { MiscModule } from '../misc/index';
import { TlChatList } from './chatlist';
import { TlChatContent } from './parts/chat-content';
import { IconsModule } from '../icons/index';
import { TlStatusFilterPipe } from './pipes/status-filter.pipe';
import { ChatService } from './services/chat.service';
import { AvatarModule } from '../avatar/index';
import { LoaderModule } from '../loader/index';
import { TlMessageFilterPipe } from './pipes/message-filter.pipe';

@NgModule( {
  imports: [
    CommonModule,
    FormsModule,
    AvatarModule,
    ReactiveFormsModule,
    MiscModule,
    ListBoxModule,
    LoaderModule,
    IconsModule
  ],
  declarations: [
    TlChatList,
    TlChatContent,
    TlStatusFilterPipe,
    TlMessageFilterPipe
  ],
  exports: [
    TlChatList,
    TlChatContent,
    TlStatusFilterPipe,
    TlMessageFilterPipe
  ]
} )
export class ChatListModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ChatListModule,
      providers: [
        ChatService
      ],
    };
  }
}
