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
  Component,
  AfterViewInit,
  Output,
  Input,
  EventEmitter,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ChatContact} from '../interfaces/chat-contact.interface';
import {Subscription} from 'rxjs';
import {ChatStatus} from '../interfaces/chat-status.interface';
import {DatePipe} from '@angular/common';
import {I18nService} from '../../i18n/i18n.service';
import {ChatService} from '../services/chat.service';
import {ChatMessage} from '../interfaces/chat-message.interface';

@Component({
  selector: 'tl-chat-content',
  templateUrl: './chat-content.html',
  styleUrls: ['./chat-content.scss'],
})
export class TlChatContent implements AfterViewInit, OnInit, OnDestroy {

  @Input() id: string;

  @Input() maxHeight = '450px';

  @Input() partner: ChatContact;

  @Input() user: ChatContact;

  @Input() loadingMessages = true;

  @Input() chatStatus: ChatStatus = {
    BUSY: '#ffc019',
    ONLINE: '#66cc99',
    OFFLINE: '#ff3100'
  };

  @Output() readMessage = new EventEmitter();

  @Output() message: EventEmitter<{ value: string, time: Date }> = new EventEmitter();

  @ViewChild('input', {static: true}) input: ElementRef;

  @ViewChild('messageContent', {static: true}) messageContent: ElementRef;

  public messages = [];

  public smoothScroll = false;

  private opened = false;

  public control = new FormControl(null, Validators.required);

  public datePipe = new DatePipe(this.i18nService.getLocale().locale);

  public saySomething = this.i18nService.getLocale().ChatList.saySomething;

  public loadingMessagesLabel = this.i18nService.getLocale().ChatList.loadingMessages;

  private subscription = new Subscription();

  private today = this.i18nService.getLocale().ChatList.today;

  private yesterday = this.i18nService.getLocale().ChatList.yesterday;

  constructor(private i18nService: I18nService,
              private change: ChangeDetectorRef,
              private chatService: ChatService) {
    this.opened = true;
  }

  ngOnInit() {
    this.messages = this.chatService.getAllMessages(this.id);
    this.listenAppendMessage();
    this.listenChangeMessages();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.setInputFocus();
      this.setScrollBottom();
    });
  }

  listenAppendMessage() {
    this.subscription.add(this.chatService.appendAndRead.subscribe((message) => {
      this.smoothScroll = true;
      this.readMessage.emit(message);
      this.setScrollBottom();
    }));
  }

  listenChangeMessages() {
    this.subscription.add(this.chatService.allMessages.subscribe((messages: ChatMessage[]) => {
      this.smoothScroll = true;
      this.messages = this.filterMessages(messages);
      this.loadingMessages = false;
      this.setScrollBottom();
      this.change.detectChanges();
    }));
  }

  filterMessages(collection) {
    return collection.filter((item: ChatMessage) => {
        if (item.from && item.to) {
          return (item.from.id === this.user.id) && (item.to.id === this.partner.id) ||
            (item.from.id === this.partner.id) && (item.to.id === this.user.id);
        }
      }
    ).sort((a, b) => {
      return new Date(a.time).getTime() - new Date(b.time).getTime();
    });
  }

  currentDate(date) {
    const yesterday = new Date(new Date().setDate((new Date().getDate() - 1)));
    if (this.getDate(date) === this.getDate()) {
      return this.today;
    } else if ((this.getDate(yesterday) === this.getDate(date))) {
      return this.yesterday;
    } else {
      return this.datePipe.transform(new Date(date), 'longDate');
    }
  }

  getDate(date = new Date()) {
    const newDate = new Date(date);
    return new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), 0, 0, 0, 0).getTime();
  }

  trackByFn(index) {
    return index;
  }

  setScrollBottom() {
    this.messageContent.nativeElement.scrollTop =
      (this.messageContent.nativeElement.scrollHeight - this.messageContent.nativeElement.clientHeight);
  }

  setInputFocus() {
    this.input.nativeElement.focus();
  }

  sendMessage() {
    if (this.control.value) {
      this.message.emit({value: this.control.value, time: new Date()});
      this.control.setValue(null);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

