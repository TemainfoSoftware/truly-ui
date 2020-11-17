import { Component, ViewChild, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TlChatList } from '../../../../../projects/truly-ui/src/components/chatlist/chatlist';
import {ChatContact} from '../../../../../projects/truly-ui/src/components/chatlist/interfaces/chat-contact.interface';

@Component({
  selector: 'app-chat2',
  templateUrl: './chat2.component.html',
  styleUrls: ['./chat2.component.scss']
})
export class Chat2Component implements OnInit {

  @Input() contacts = [];

  @Input() user: ChatContact;

  @Output() send: EventEmitter<any> = new EventEmitter();

  @Output() readMessage: EventEmitter<any> = new EventEmitter();

  @Output() selectContact: EventEmitter<any> = new EventEmitter();

  @ViewChild(TlChatList, {static: false}) chat: TlChatList;

  constructor() { }

  ngOnInit() {
  }

  onReadMessage($event) {
    this.readMessage.emit($event);
  }

  onSelectContact($event) {
    this.selectContact.emit($event);
  }


}
