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
import { Component } from '@angular/core';

import * as json from './chatlistdemo-dataproperties.json';
import * as jsonEvents from './chatlistdemo-methods.json';
import { Status } from '../../../../projects/truly-ui/src/components/chatlist/enums/status.enum';
import { ChatContact } from '../../../../projects/truly-ui/src/components/chatlist/interfaces/chat-contact.interface';
import { ChatService } from '../../../../projects/truly-ui/src/components/chatlist/services/chat.service';

@Component( {
  selector : 'app-chat',
  templateUrl : './chatlistdemo.component.html',
  styleUrls : [ './chatlistdemo.component.scss' ],
} )
export class ChatListDemoComponent {

  public dataTableProperties;

  public dataTableEvents;

  public contacts: ChatContact[] = [
    { id: '1', name: 'Brad Pitt', description: 'Actor', status:  Status.ONLINE,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Brad_Pitt_Fury_2014.jpg/220px-Brad_Pitt_Fury_2014.jpg' },
    { id: '2', name: 'Emma Watson', description: 'Actress', status:  Status.ONLINE,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Emma_Watson_2013.jpg/220px-Emma_Watson_2013.jpg'
    },
    { id: '3', name: 'Julia Roberts', description: 'Actress', status:  Status.ONLINE,
      image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/julia-roberts-transformation-1-1543325921.jpg'
    },
    { id: '200', name: 'Angelina Jolie', description: 'Actress', status:  Status.ONLINE,
      image: 'http://midias.gazetaonline.com.br/_midias/jpg/2018/06/13/32703323_241643243091103_7264540910321401856_n-5653514.jpg' },
  ];

  public userONE =  { id: '1', name: 'Brad Pitt', description: 'Actor', status:  Status.ONLINE };

  public userTWO =  { id: '200', name: 'Angelina Jolie', description: 'Actress', status:  Status.ONLINE };

  constructor(private chatService: ChatService) {
    this.dataTableProperties = json.dataProperties;
    this.dataTableEvents = jsonEvents.dataMethods;
  }

  onSendMessage($event) {
    switch ($event.to.id) {
      case this.userTWO.id: this.chatService.appendMessage($event, 'CHAT-TWO');
      break;
      case this.userONE.id: this.chatService.appendMessage($event, 'CHAT-ONE');
      break;
    }
  }

}

