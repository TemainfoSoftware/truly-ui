import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chat2Component } from './chat2.component';
import { ChatListModule } from '../../../../../projects/truly-ui/src/components/chatlist/index';

@NgModule({
  declarations: [
    Chat2Component
  ],
  imports: [
    ChatListModule.forRoot(),
    CommonModule
  ],
  exports: [ Chat2Component ]
})
export class Chat2Module { }
