import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TlChatList } from './chatlist';
import { TabIndexService } from '../form/tabIndex.service';
import { IdGeneratorService } from '../core/helper/idgenerator.service';
import { NameGeneratorService } from '../core/helper/namegenerator.service';
import { ChatListService } from './chatlist.service';

import { ListBoxModule } from '../listbox/index';
import { MiscModule } from '../misc/index';

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
