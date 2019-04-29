import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chat2Module } from '../chat2/chat2.module';
import { ChatListModule } from '../../../../../projects/truly-ui/src/components/chatlist/index';
import { Chat3Component } from './chat3.component';

@NgModule({
  declarations: [
    Chat3Component
  ],
  imports: [
    ChatListModule.forRoot(),
    CommonModule
  ],
  exports: [ Chat3Component ]
})
export class Chat3Module { }
