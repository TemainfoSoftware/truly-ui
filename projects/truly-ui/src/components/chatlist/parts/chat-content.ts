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
  Component, AfterViewInit, Output, Input, EventEmitter, ViewChild, ElementRef, OnDestroy, SimpleChanges, OnChanges,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ChatContact } from '../interfaces/chat-contact.interface';
import { ChatMessage } from '../interfaces/chat-message.interface';
import { Subscription } from 'rxjs';
import { ChatStatus } from '../interfaces/chat-status.interface';
import { DatePipe } from '@angular/common';
import {I18nService} from '../../i18n/i18n.service';

@Component( {
  selector: 'tl-chat-content',
  templateUrl: './chat-content.html',
  styleUrls: [ './chat-content.scss' ],
} )
export class TlChatContent implements AfterViewInit, OnDestroy, OnChanges {

  @Input() maxHeight = '450px';

  @Input() partner: ChatContact;

  @Input() user: ChatContact;

  @Input() loadingMessages = true;

  @Input() messages: ChatMessage[] = [];

  @Input() chatStatus: ChatStatus = {
    BUSY: '#ffc019',
    ONLINE: '#66cc99',
    OFFLINE: '#ff3100'
  };

  @Output() message: EventEmitter<{ value: string, time: Date }> = new EventEmitter();

  @ViewChild('input', {static: true} ) input: ElementRef;

  @ViewChild('messageContent', {static: true} ) messageContent: ElementRef;

  private opened = false;

  public control = new FormControl(null, Validators.required);

  public datePipe = new DatePipe(this.i18nService.getLocale().locale);

  private subscription = new Subscription();

  private today = this.i18nService.getLocale().ChatList.today;

  private yesterday = this.i18nService.getLocale().ChatList.yesterday;

  public saySomething = this.i18nService.getLocale().ChatList.saySomething;

  public loadingMessagesLabel = this.i18nService.getLocale().ChatList.loadingMessages;

  constructor(private i18nService: I18nService) {
    this.opened = true;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.setInputFocus();
    });
  }

  filterMessages() {
    this.messages = this.messages.filter((item: ChatMessage, index, array) =>
      (item.from.id === this.user.id) && (item.to.id === this.partner.id) ||
      (item.from.id === this.partner.id) && (item.to.id === this.user.id)
    );
    this.sortMessages();
    this.loadingMessages = false;
    this.setScrollBottom();
  }

  currentDate( date ) {
    const yesterday = new Date(new Date().setDate((new Date().getDate() - 1)));
    if ( this.getDate(date) === this.getDate() ) {
      return this.today;
    } else if ( (this.getDate(yesterday) === this.getDate(date)) ) {
      return this.yesterday;
    } else {
       return this.datePipe.transform( new Date(date), 'longDate' );
    }
  }

  getDate( date = new Date() ) {
    const newDate = new Date( date );
    return new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), 0, 0, 0, 0).getTime();
  }

  trackByFn(index) {
    return index;
  }

  setScrollBottom() {
    setTimeout(() => {
      this.messageContent.nativeElement.scrollTop =
        (this.messageContent.nativeElement.scrollHeight - this.messageContent.nativeElement.clientHeight);
    });
  }

  setInputFocus() {
    this.input.nativeElement.focus();
  }

  sendMessage() {
    if (this.control.value) {
      this.message.emit({ value: this.control.value, time: new Date() });
      this.control.setValue(null);
    }
  }

  sortMessages() {
    this.messages = this.messages.sort((a, b) => {
      return new Date(a.time).getTime() - new Date(b.time).getTime();
    });
  }

  ngOnChanges( { messages }: SimpleChanges ) {
    if (messages && messages['currentValue'].length > 0) {
      this.filterMessages();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

