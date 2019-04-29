import { Component, OnInit, ViewChild, Input, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { TlChatList } from '../../../../../projects/truly-ui/src/components/chatlist/chatlist';
import { ChatMessage } from '../../../../../projects/truly-ui/src/components/chatlist/interfaces/chat-message.interface';
import { Status } from '../../../../../projects/truly-ui/src/components/chatlist/enums/status.enum';
import { ChatContact } from '../../../../../projects/truly-ui/src/components/chatlist/interfaces/chat-contact.interface';

@Component({
  selector: 'app-chat3',
  templateUrl: './chat3.component.html',
  styleUrls: ['./chat3.component.scss']
})
export class Chat3Component implements AfterViewInit {

  @Input() contacts = [];

  @Input() user: ChatContact;

  @Output() send: EventEmitter<any> = new EventEmitter();

  @ViewChild(TlChatList) chat: TlChatList;

  constructor() { }

  ngAfterViewInit() {
    const messages: ChatMessage[] = [
      {
        from: { id: '1', name: 'William Aguera', description: 'Médico Ortopedista', status:  Status.ONLINE },
        to: this.user,
        message: 'Eae Bro!',
        time: new Date(2019, 3, 21, 13, 0, 5),
        viewed: false
      },
      {
        from: { id: '1', name: 'William Aguera', description: 'Médico Ortopedista', status:  Status.ONLINE },
        to: this.user,
        message: 'Eae Bro!',
        time: new Date(2019, 3, 23, 15, 0, 5),
        viewed: false
      },
      {
        from: { id: '1', name: 'William Aguera', description: 'Médico Ortopedista', status:  Status.ONLINE },
        to: this.user,
        message: 'Tudo bem então !',
        time: new Date(2019, 3, 22, 14, 0, 5),
        viewed: false
      },
      {
        from: { id: '1', name: 'William Aguera', description: 'Médico Ortopedista', status:  Status.ONLINE },
        to: this.user,
        message: 'OK !',
        time: new Date(2019, 3, 22, 19, 10, 5),
        viewed: false
      },
      {
        from: { id: '1', name: 'William Aguera', description: 'Médico Ortopedista', status:  Status.ONLINE },
        to: this.user,
        message: 'Fala manin',
        time: new Date(),
        viewed: false
      },
      {
        from:  { id: '1', name: 'William Aguera', description: 'Médico Ortopedista', status:  Status.ONLINE },
        to: this.user,
        message: 'Tudo certo ?',
        time: new Date(),
        viewed: false
      }
    ];
    setTimeout(() => {
      this.chat.loadMessages(messages);
    }, 10000);
  }

  onSelectContact($event) {
    console.log('SelectContact', $event);
  }

}
