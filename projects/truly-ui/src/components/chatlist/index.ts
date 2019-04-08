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

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MiscModule,
        ListBoxModule,
        IconsModule
    ],
    declarations: [
        TlChatList,
        TlChatContent,
        TlStatusFilterPipe
    ],
    exports: [
        TlChatList,
        TlChatContent,
        TlStatusFilterPipe
    ]
})
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
