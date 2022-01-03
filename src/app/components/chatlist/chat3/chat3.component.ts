import { Component, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { TlChatList } from '../../../../../projects/truly-ui/src/components/chatlist/chatlist';
import { ChatContact } from '../../../../../projects/truly-ui/src/components/chatlist/interfaces/chat-contact.interface';

@Component({
  selector: 'app-chat3',
  templateUrl: './chat3.component.html',
  styleUrls: ['./chat3.component.scss']
})
export class Chat3Component {

  @Input() contacts = [];

  @Input() user: ChatContact;

  @Output() send: EventEmitter<any> = new EventEmitter();

  @Output() readMessage: EventEmitter<any> = new EventEmitter();

  @Output() selectContact: EventEmitter<any> = new EventEmitter();

  @ViewChild(TlChatList, {static: false}) chat: TlChatList;

  constructor() { }

  onReadMessage($event) {
    this.readMessage.emit($event);
  }

  onUnreadMessages($event) {
    console.log('CHAT3', $event);
  }

  onSelectContact($event) {
    this.selectContact.emit($event);
  }

}
