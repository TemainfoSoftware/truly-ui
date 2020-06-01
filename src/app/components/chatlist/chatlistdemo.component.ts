/*
 MIT License

 Copyright (c) 2019 Temainfo Software

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the 'Software'), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
import {Component, OnInit} from '@angular/core';

import * as json from './chatlistdemo-dataproperties.json';
import * as jsonEvents from './chatlistdemo-methods.json';
import * as jsonEventsSelector from './chatlistdemo-methods-selector.json';
import {Status} from '../../../../projects/truly-ui/src/components/chatlist/enums/status.enum';
import {ChatContact} from '../../../../projects/truly-ui/src/components/chatlist/interfaces/chat-contact.interface';
import {ChatService} from '../../../../projects/truly-ui/src/components/chatlist/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chatlistdemo.component.html',
  styleUrls: ['./chatlistdemo.component.scss'],
})
export class ChatListDemoComponent implements OnInit {

  public dataTableProperties;

  public dataTableMethods;

  public dataTableEventsSelector;

  public contacts: ChatContact[] = [
    {
      id: '1', name: 'Brad Pitt', description: 'Actor', status: Status.ONLINE,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Brad_Pitt_Fury_2014.jpg/220px-Brad_Pitt_Fury_2014.jpg',
      lastActivity: new Date('2020-05-28T12:00:23.810Z')
    },
    {
      id: '2', name: 'Emma Watson', description: 'Actress', status: Status.ONLINE,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Emma_Watson_2013.jpg/220px-Emma_Watson_2013.jpg',
      lastActivity: new Date(new Date().setDate( new Date().getHours() - 12))
    },
    {
      id: '3', name: 'Julia Roberts', description: 'Actress', status: Status.ONLINE,
      image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/julia-roberts-transformation-1-1543325921.jpg',
      lastActivity: new Date(new Date().setDate( new Date().getHours() - 2))
    },
    {
      id: '200', name: 'Angelina Jolie', description: 'Actress', status: Status.ONLINE,
      image: 'http://midias.gazetaonline.com.br/_midias/jpg/2018/06/13/32703323_241643243091103_7264540910321401856_n-5653514.jpg',
      lastActivity: new Date(new Date().setDate( new Date().getHours() - 8))
    },
  ];

  public msm = [
    {
      id: '1',
      from: {id: '1', name: 'Brad Pitt', description: 'Actor', status: 'ONLINE'},
      message: 'OI ',
      time: new Date(),
      to: {id: '200', name: 'Angelina Jolie', description: 'Actress', status: 'ONLINE'},
      viewed: false
    },
    {
      id: '2',
      from: {id: '1', name: 'Brad Pitt', description: 'Actor', status: 'ONLINE'},
      message: 'OI tudo bem',
      time: new Date(),
      to: {id: '200', name: 'Angelina Jolie', description: 'Actress', status: 'ONLINE'},
      viewed: false
    },
  ];

  public userONE = {id: '1', name: 'Brad Pitt', description: 'Actor', status: Status.ONLINE};

  public userTWO = {id: '200', name: 'Angelina Jolie', description: 'Actress', status: Status.ONLINE};

  constructor(private chatService: ChatService) {
    this.dataTableProperties = json.dataProperties;
    this.dataTableMethods = jsonEvents.dataMethods;
    this.dataTableEventsSelector = jsonEventsSelector.dataMethods;
  }

  onSendMessage($event) {
    this.chatService.appendMessage($event, this.userONE, 'CHAT-ONE');
    this.chatService.appendMessage($event, this.userTWO, 'CHAT-TWO');
  }

  ngOnInit() {
    setTimeout(() => {
      this.chatService.loadMessages(this.msm, 'CHAT-ONE');
      this.chatService.loadMessages(this.msm, 'CHAT-TWO');
    }, 2000);
  }

  onReadOne($event) {
    this.chatService.readMessages([$event], this.userONE, 'CHAT-ONE');
  }

  onReadTwo($event) {
    this.chatService.readMessages([$event], this.userTWO, 'CHAT-TWO');
  }

  onSelectContactOne($event) {
    this.chatService.readMessages($event.unreadMessages, this.userONE, 'CHAT-ONE');
  }

  onSelectContactTwo($event) {
    this.chatService.readMessages($event.unreadMessages, this.userTWO, 'CHAT-TWO');
  }

}

