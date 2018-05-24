import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TlChatList } from './chatlist';
import { ListBoxModule } from '../listbox';
import { MiscModule } from '../misc';
import { TabIndexService } from '../form/tabIndex.service';
import { IdGeneratorService } from '../core/helper/idgenerator.service';
import { NameGeneratorService } from '../core/helper/namegenerator.service';
import { ChatListService } from './chatlist.service';

export * from './chatlist';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MiscModule,
        ListBoxModule
    ],
    declarations: [
        TlChatList,
    ],
    exports: [
        TlChatList,
    ],
    providers: [
        TabIndexService,
        IdGeneratorService,
        NameGeneratorService,
        ChatListService
    ]
})
export class ChatListModule {}
