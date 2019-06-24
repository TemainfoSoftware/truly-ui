import { Component, ViewChild, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TlChatList } from '../../../../../projects/truly-ui/src/components/chatlist/chatlist';

@Component({
  selector: 'app-chat2',
  templateUrl: './chat2.component.html',
  styleUrls: ['./chat2.component.scss']
})
export class Chat2Component implements OnInit {

  @Input() contacts = [];

  @Input() user = {};

  @Output() send: EventEmitter<any> = new EventEmitter();

  @ViewChild(TlChatList, {static: false}) chat: TlChatList;

  constructor() { }

  ngOnInit() {
  }

}
