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
import {ChatContact} from '../interfaces/chat-contact.interface';

@Injectable()
export class ChatService {

  private chatObject = {};

  public appendAndRead = new Subject();

  public changeStatus = new Subject();

  public allMessages = new Subject();

  public newMessages = new Subject();

  public unreadMessages = new Subject();

  constructor() {
  }

  loadMessages(messages: ChatMessage[], chatId: string, user: ChatContact) {
    if (!this.existChat(chatId)) {
      this.chatObject[chatId] = {messages: []};
    }
    if (messages.length > 0) {
      this.chatObject[chatId].messages = messages;
      this.allMessages.next(this.chatObject[chatId].messages);
      this.unreadMessages.next(this.getUnreadMessages(this.chatObject[chatId].messages, user));
    } else {
      this.unreadMessages.next([]);
    }
  }

  appendMessage(message: ChatMessage, user: ChatContact, chatId: string) {
    if (this.existChat(chatId)) {
      this.chatObject[chatId].messages = [...this.chatObject[chatId].messages, message];
      this.allMessages.next(this.chatObject[chatId].messages);
      if (message.from.id !== user.id) {
        this.appendAndRead.next(message);
        this.newMessages.next(this.hasMessages(this.chatObject[chatId].messages, user));
        this.unreadMessages.next(this.getUnreadMessages(this.chatObject[chatId].messages, user));
      }
    }
  }

  readMessages(messages: ChatMessage[], user: ChatContact, chatId: string) {
    if ( messages.length > 0 && this.isMessagesToUser(messages, user)) {
      messages.forEach((val) => {
        const index = this.chatObject[chatId || this.getFirstChat()].messages.findIndex((message) => message.id === val.id);
        if (index >= 0) {
          this.chatObject[chatId || this.getFirstChat()].messages[index].viewed = true;
        }
      });
      setTimeout(() => {
        this.allMessages.next(this.chatObject[chatId].messages);
        this.newMessages.next(this.hasMessages(this.chatObject[chatId].messages, user));
        this.unreadMessages.next(this.getUnreadMessages(this.chatObject[chatId].messages, user));
      }, 500);
    }
  }

  readAll(chatId: string) {
    this.chatObject[chatId || this.getFirstChat()].messages.forEach((item: ChatMessage) => item.viewed = true);
    this.allMessages.next(this.chatObject[chatId].messages);
  }

  setStatus(status: Status, chatId: string) {
    this.changeStatus.next({status, chatId});
  }

  getAllMessages(chatId: string) {
    if (this.existChat(chatId)) {
      return this.chatObject[chatId].messages;
    }
    return [];
  }

  deleteChat(chatId: string) {
    delete this.chatObject[chatId];
  }

  getUnreadMessages(messages, user: ChatContact) {
    if (messages.length > 0) {
      return messages.filter((message: ChatMessage) => {
        if (message.from && message.to) {
          return (!message.viewed) && (message.to.id === user.id);
        }
      });
    }
    return [];
  }

  private isMessagesToUser(messages: ChatMessage[], user: ChatContact) {
    return messages.filter((message) => message.to.id === user.id).length > 0;
  }

  private existChat(chatId: string) {
    return this.chatObject.hasOwnProperty(chatId);
  }

  private hasMessages(messages, user: ChatContact) {
    return messages.filter((value) => {
      if (value.to && user) {
        return !value.viewed && (value.to.id === user.id);
      }
    }).length > 0;
  }


  private getFirstChat() {
    const first = Object.keys(this.chatObject)[0];
    return this.chatObject[first];
  }

}
