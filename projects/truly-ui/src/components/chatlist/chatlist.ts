/*
 MIT License

 Copyright (c) 2019 Temainfo Software

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
import {
  Component, ElementRef, EventEmitter, Input, OnChanges, Renderer2, SimpleChanges, ViewChild, Output, AfterViewInit,
  OnDestroy
} from '@angular/core';
import { ChatStatus } from './interfaces/chat-status.interface';
import { ChatContact } from './interfaces/chat-contact.interface';
import { ChatMessage } from './interfaces/chat-message.interface';
import { Status } from './enums/status.enum';
import { Subscription } from 'rxjs';

@Component( {
  selector: 'tl-chatlist',
  templateUrl: './chatlist.html',
  styleUrls: [ './chatlist.scss' ],
} )
export class TlChatList implements AfterViewInit, OnDestroy {

  @Input() maxHeight = '450px';

  @Input() width = '400px';

  @Input() chatStatus: ChatStatus = {
    busy: '#ffc019',
    online: '#66cc99',
    offline: '#ff3100'
  };

  @Input() partner: ChatContact;

  @Input() user: ChatContact;

  @Input('contacts')
  set contacts( data: ChatContact[] ) {
    if (data && data.length > 0) {
      this._dataSource = data.filter((item) => item.id !== this.user.id);
    }
  }

  get contacts(): ChatContact[] {
    return this._dataSource;
  }

  @Output() sendMessage: EventEmitter<ChatMessage> = new EventEmitter();

  @Output() changeStatus: EventEmitter<any> = new EventEmitter();

  @ViewChild('content') content: ElementRef;

  public transform = '100px';

  public selected = 'online';

  public insideChat = false;

  public messages: ChatMessage[] = [];

  private _dataSource;

  private subscription = new Subscription();

  constructor(private renderer: Renderer2) {}

  get online() {
    return Status.ONLINE;
  }

  get offline() {
    return Status.OFFLINE;
  }

  get busy() {
    return Status.BUSY;
  }

  ngAfterViewInit() {
  }

  animationContentDone(event: AnimationEvent) {
    if (event.animationName === 'showOffContent') {
      this.insideChat = true;
    }
  }

  getUnreadMessages(id: string) {
    return this.messages.filter((item: ChatMessage) =>
    (!item.viewed && item.from.id === id) && (item.to.id === this.user.id) );
  }

  selectPartner(item: ChatContact) {
    this.updatePartner(item);
    this.renderer.setStyle(this.content.nativeElement, 'animation', 'showOffContent 0.2s forwards');
  }

  updatePartner(item: ChatContact) {
    this.partner = item;
  }

  loadMessages(messages: ChatMessage[]) {
    this.messages = messages;
  }

  appendMessage(message: ChatMessage) {
    this.messages = [ ...this.messages, message ];
  }

  setStatus(status: Status) {
    this.changeStatus.emit({ user: this.user, status: status });
  }

  onMessage(message: { value: string, time: Date }) {
    const msm = {
      to: this.partner,
      from: this.user,
      message: message.value,
      time: message.time,
      viewed: false
    };
    this.sendMessage.emit(msm);
    this.appendMessage(msm);
  }

  selectStatus(status) {
    if (status === 'online') {
      this.transform = '100px';
      this.selected = 'online';
    } else if (status === 'offline') {
      this.transform = '200px';
      this.selected = 'offline';
    } else {
      this.transform = '0';
      this.selected = 'chat';
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

