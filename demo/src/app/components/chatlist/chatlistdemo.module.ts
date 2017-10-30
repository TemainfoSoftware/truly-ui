import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";

import { HighlightJsModule } from 'ngx-highlight-js';

import { ChatListModule } from 'truly-ui/chatlist';

import { ChatListDemoRoutingModule } from "./chatlistdemo-routing.module";
import { ChatListDemo } from "./chatlistdemo.component";
import { InputModule } from 'truly-ui/input';
import { ButtonModule } from 'truly-ui/button';

import { DumpDataService } from "../../shared/services/dumpdata";

@NgModule( {
  declarations: [
    ChatListDemo
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
    ChatListDemo
  ],
  providers: [
    DumpDataService
  ]
} )
export class ChatListDemoModule {
}
