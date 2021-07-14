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
  Component, ElementRef, EventEmitter, Input, Renderer2, ViewChild, Output,
  OnDestroy, OnInit, ChangeDetectorRef, OnChanges, SimpleChanges
} from '@angular/core';
import {ChatStatus} from './interfaces/chat-status.interface';
import {ChatContact} from './interfaces/chat-contact.interface';
import {ChatMessage} from './interfaces/chat-message.interface';
import {Status} from './enums/status.enum';
import {Subscription} from 'rxjs';
import {ChatService} from './services/chat.service';
import {I18nService} from '../i18n/i18n.service';

let uniqueIdentifier = 0;

@Component({
  selector: 'tl-chatlist',
  templateUrl: './chatlist.html',
  styleUrls: ['./chatlist.scss'],
})
export class TlChatList implements OnInit, OnChanges, OnDestroy {

  @Input() maxHeight = '450px';

  @Input() width = '400px';

  @Input() color = 'basic';

  @Input() loadingMessages = false;

  @Input() chatStatus: ChatStatus = {
    BUSY: '#ffc019',
    ONLINE: '#66cc99',
    OFFLINE: '#ff3100'
  };

  @Input() partner: ChatContact;

  @Input() lastActivityCheck = 0;

  @Input() id = `tl-chatlist-${uniqueIdentifier++}`;

  @Input() user: ChatContact;

  @Input('contacts')
  set contacts( data: ChatContact[] ) {
    this._dataSource = this.setDataSource( data );
  }
  get contacts(): ChatContact[] {
    return this._dataSource;
  }

  @Output() readMessage: EventEmitter<ChatMessage[]> = new EventEmitter();

  @Output() unreadMessages: EventEmitter<ChatMessage[]> = new EventEmitter();

  @Output() sendMessage: EventEmitter<ChatMessage> = new EventEmitter();

  @Output() changeStatus: EventEmitter<any> = new EventEmitter();

  @Output() selectContact: EventEmitter<any> = new EventEmitter();

  @ViewChild('content', {static: false}) content: ElementRef;

  public transform = '0';

  public selected = 'ONLINE';

  public noContactsFound = this.i18nService.getLocale().ChatList.noContactsFound;

  public searchContact = this.i18nService.getLocale().ChatList.searchContact;

  public insideChat = false;

  public filterControl = '';

  private _dataSource;

  public messages = [];

  private subscription = new Subscription();

  constructor(private renderer: Renderer2,
              private change: ChangeDetectorRef,
              private chatService: ChatService,
              private i18nService: I18nService) {
  }

  get online() {
    return Status.ONLINE;
  }

  get offline() {
    return Status.OFFLINE;
  }

  get busy() {
    return Status.BUSY;
  }

  ngOnInit() {
    this.listenChangeStatus();
    this.listenChangeMessages();
    this.listenUnreadMessages();
    this.messages = this.chatService.getAllMessages( this.id );
  }

  ngOnChanges(changes: SimpleChanges) {
    if ( changes['contacts'] && changes['contacts'].currentValue && changes['contacts'].currentValue.length > 0) {
      this.setDataSource( changes['contacts'].currentValue );
    }
  }

  setDataSource(contacts: ChatContact[], user: ChatContact = this.user) {
    if ( contacts && user && contacts.length > 0 ) {
      if (!user.id) {
        throw Error('User id not found');
      }
      this._dataSource = contacts
        .filter((item) => item.id !== user.id)
        .map((contact) => {
          return {
            ...contact,
            status: this.getStatus(contact)
          };
        });
    }
  }

  listenChangeStatus() {
    this.subscription.add(this.chatService.changeStatus.subscribe((value: { chatId: string, status: Status }) => {
      if (value.chatId === this.id) {
        this.setStatus(value.status);
      }
    }));
  }

  listenChangeMessages() {
    this.subscription.add(this.chatService.allMessages.subscribe((messages: ChatMessage[]) => {
      this.messages = messages;
      this.change.detectChanges();
    }));
  }

  listenUnreadMessages() {
    this.subscription.add(this.chatService.unreadMessages.subscribe((messages: ChatMessage[]) => {
      this.unreadMessages.emit( messages );
    }));
  }

  animationContentDone(event: AnimationEvent) {
    if (event.animationName === 'showOffContent') {
      this.insideChat = true;
    }
  }

  getUnreadMessages(item: ChatContact) {
    if (this.messages.length > 0) {
      return this.messages.filter((message: ChatMessage) => {
        if (message.from && message.to) {
          return (!message.viewed && message.from.id === item.id) && (message.to.id === this.user.id);
        }
      });
    }
    return [];
  }

  getFilter(statusSelected) {
    if (statusSelected === this.offline) {
      return {filter: this.filterControl, status: [this.offline], lastActivityCheck: this.lastActivityCheck};
    }
    return {filter: this.filterControl, status: [this.online, this.busy], lastActivityCheck: this.lastActivityCheck};
  }

  trackByFn(index) {
    return index;
  }

  selectPartner(item: ChatContact) {
    this.updatePartner(item);
    this.selectContact.emit({...item, unreadMessages: this.getUnreadMessages(item)});
    this.renderer.setStyle(this.content.nativeElement, 'animation', 'showOffContent 0.2s forwards');
    this.chatService.readMessages( this.getUnreadMessages(item), this.user, this.id);
  }

  updatePartner(item: ChatContact) {
    this.partner = item;
  }

  setStatus(status: Status) {
    this.changeStatus.emit({user: this.user, status: status});
  }

  onMessage(message: { value: string, time: Date }) {
    const msm = {
      id: String(new Date().getTime()),
      to: this.partner,
      from: this.user,
      message: message.value,
      time: message.time,
      viewed: false
    };
    this.sendMessage.emit(msm);
  }

  selectStatus(status) {
    if (status === 'ONLINE') {
      this.transform = '0';
      this.selected = 'ONLINE';
    } else if (status === 'OFFLINE') {
      this.transform = '100px';
      this.selected = 'OFFLINE';
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  private getStatus(contact) {
    if ( this.lastActivityCheck === 0 ) {
      return contact.status;
    }

    if ( this.lastActivityCheck > 0 ) {
      const diffMinutes = this.getDiffMinutes(contact.lastActivity) * 60;
      return diffMinutes >= this.lastActivityCheck ? Status.OFFLINE : contact.status;
    }
  }

  private getDiffMinutes(lastActivity = new Date()) {
    const currentTime = new Date().getTime();
    const lastActivityTime = new Date(lastActivity).getTime();
    const diff = ((currentTime - lastActivityTime) / 1000 ) / 60;
    return Math.abs(Math.round(diff));
  }

}

