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
import { AfterViewInit, Component, ViewChild } from '@angular/core';

import * as json from './chatlistdemo-dataproperties.json';
import * as jsonMethods from './chatlistdemo-methods.json';
import { DumpDataService } from '../../shared/services/dumpdata';
import { Status } from '../../../../projects/truly-ui/src/components/chatlist/enums/status.enum';
import { ChatContact } from '../../../../projects/truly-ui/src/components/chatlist/interfaces/chat-contact.interface';
import { Chat2Component } from './chat2/chat2.component';
import { Chat3Component } from './chat3/chat3.component';
import { ChatService } from '../../../../projects/truly-ui/src/components/chatlist/services/chat.service';

@Component( {
  selector : 'app-chat',
  templateUrl : './chatlistdemo.component.html',
  styleUrls : [ './chatlistdemo.component.scss' ],
} )
export class ChatListDemoComponent implements AfterViewInit {

  public dataTableProperties;

  public contacts: ChatContact[] = [
    { id: '1', name: 'William Aguera', description: 'Médico Ortopedista', status:  Status.ONLINE, avatar: 'williamaguera.m@hotmail.com' },
    { id: '200', name: 'Genesson', description: 'Médico Geriatra', status:  Status.ONLINE, avatar: 'genesson_sauer@hotmail.com'  },
    { id: '300', name: 'Adilson', description: 'Médico Otorrino', status:  Status.BUSY, avatar: 'adilson@temainfo.com.br' }
  ];

  public user2 =  { id: '1', name: 'William Aguera', description: 'Médico Ortopedista', status:  Status.ONLINE };

  public user3 =  { id: '200', name: 'Genesson', description: 'Médico Geriatra', status:  Status.ONLINE };

  public appendChat2;

  public appendChat3;

  constructor(private chatService: ChatService) {
    this.dataTableProperties = json.dataProperties;
  }

  ngAfterViewInit() {
  }

  onSendMessage($event) {
    console.log('evt to', $event);
    switch ($event.to.id) {
      case this.user3.id: this.chatService.appendMessage($event);
      break;
      case this.user2.id: this.chatService.appendMessage($event);
      break;
    }
  }

}

