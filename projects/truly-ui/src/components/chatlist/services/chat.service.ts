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
import {Injectable} from '@angular/core';
import {ChatMessage} from '../interfaces/chat-message.interface';
import {Status} from '../enums/status.enum';
import {Subject} from 'rxjs';

@Injectable()
export class ChatService {

  private chatObject = {};

  public append = new Subject();

  public changeStatus = new Subject();

  constructor() {
  }

  createChat(chatId: string) {
    if (!this.existChat(chatId)) {
      this.chatObject[chatId] = {messages: [], status: Status};
    }
  }

  existChat(chatId: string) {
    return this.chatObject.hasOwnProperty(chatId);
  }

  loadMessages(messages: ChatMessage[], chatId: string) {
    if (this.existChat(chatId)) {
      this.chatObject[chatId].messages = messages;
    }
  }

  getAllMessages(chatId: string) {
    if (this.chatObject[chatId]) {
      return this.chatObject[chatId].messages;
    }
    return [];
  }


  appendMessage(message: ChatMessage, chatId?: string) {
    if (this.existChat(chatId)) {
      this.chatObject[chatId].messages = [...this.chatObject[chatId].messages, message];
      this.append.next(message);
    }
  }

  readMessages(messages: ChatMessage[], chatId?: string) {
    messages.forEach(( val ) => {
      const index = this.chatObject[chatId || this.getFirstChat()].messages.findIndex(( message ) => message.id === val.id );
      if ( index >= 0 ) {
        this.chatObject[chatId || this.getFirstChat()].messages[index].viewed = true;
      }
    });
  }

  readAll(chatId?: string) {
    this.chatObject[chatId || this.getFirstChat()].messages.forEach((item: ChatMessage) => item.viewed = true);
  }

  setStatus(status: Status, chatId?: string) {
    this.changeStatus.next({status, chatId});
  }

  private getFirstChat() {
    const first = Object.keys(this.chatObject)[0];
    return this.chatObject[first];
  }

  removeChat(chatId: string) {
    delete this.chatObject[chatId];
  }

}
