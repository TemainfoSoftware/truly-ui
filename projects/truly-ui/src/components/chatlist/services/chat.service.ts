/*
 MIT License

 Copyright (c) 2017 Temainfo Sistemas

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
import { Injectable } from '@angular/core';
import { ChatMessage } from '../interfaces/chat-message.interface';
import { TlChatList } from '../chatlist';
import { Status } from '../enums/status.enum';

@Injectable()
export class ChatService {

  private chatList: TlChatList[] = [];

  constructor() {
  }

  set chat( chat ) {
    this.chatList = [ ...this.chatList, chat ];
  }

  private getChat( id: string ) {
    return this.chatList.filter((item) => item.id === id)[0];
  }

  loadMessages( messages: ChatMessage[], chatId?: string ) {
     this.getChat(chatId || this.getFirstChat() ).loadMessages( messages );
  }

  appendMessage( message: ChatMessage, chatId?: string ) {
    this.getChat(chatId || this.getFirstChat()).appendMessage( message );
  }

  readAll( chatId?: string ) {
    this.getChat(chatId || this.getFirstChat()).readAllMessages();
  }

  setStatus(status: Status, chatId?: string ) {
    this.getChat(chatId || this.getFirstChat()).setStatus(status);
  }

  private getFirstChat() {
    return this.chatList[0].id;
  }

}
