/*
 MIT License

 Copyright (c) 2017 Temainfo Sistemas

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
  Component, ElementRef, AfterViewInit, Input, OnInit, QueryList,
  ViewChildren, NgZone, Output, EventEmitter, forwardRef,
  ViewChild,
} from '@angular/core';

import { TabIndexService } from '../form/tabIndex.service';
import { IdGeneratorService } from '../core/helper/idgenerator.service';
import { NameGeneratorService } from '../core/helper/namegenerator.service';
import { ComponentDefaultBase } from '../core/base/component-default.base';
import { TlListBox } from '../listbox/listbox';
import { ChatListService } from './chatlist.service';

const Away = 'Away';
const Online = 'Online';
const Offline = 'Offline';
const Busy = 'Busy';

@Component( {
    selector: 'tl-chatlist',
    templateUrl: './chatlist.html',
    styleUrls: [ './chatlist.scss' ]
} )
export class TlChatList extends ComponentDefaultBase implements AfterViewInit, OnInit {

  @Input() data = [];

  @Input() searchInput;

  @Output() onClickItem: EventEmitter<any> = new EventEmitter();

  @ViewChildren( forwardRef( () => TlListBox ) ) listBoxes: QueryList<TlListBox>;

  @ViewChild( 'overflow' ) overflow: ElementRef;

  public scrollChat;

  private selected = '';

  constructor( tabIndexService: TabIndexService, idService: IdGeneratorService, nameService: NameGeneratorService,
               public chatListService: ChatListService, private chat: ElementRef ) {
    super( tabIndexService, idService, nameService );
  }

  ngOnInit() {
      this.chatListService.data = this.data;
      this.filterDataStatus();
  }

  ngAfterViewInit() {
      this.setElement( this.chat, 'tl-chatlist' );
  }

  filterDataStatus() {
      this.chatListService.data.forEach( ( value ) => {
          this.isNotOffline( value ) ?
              this.chatListService.online.push( value ) : this.chatListService.offline.push( value );
      } );
      this.chatListService.sortArray( this.chatListService.online );
      this.chatListService.sortArray( this.chatListService.offline );
  }

  getColorByStatus( item ) {
      switch ( item.status ) {
          case 'Busy':
              return '#f77171';
          case 'Online':
              return '#81e2b2';
          case 'Offline':
              return '#d8d8d8';
          case 'Away':
              return '#fcb27e';
      }
  }

  handleScrollChat( $event ) {
      this.setScrollChat( $event );
      this.setScrollFirstList();

      if ( this.scrollChat + this.heightSecondList() >= this.heightFirstList() ) {
          this.listBoxes.toArray()[ 1 ].itemContainer.nativeElement.scrollTop =
              (this.scrollChat - this.heightFirstList());
      }
  }


  onClickItemChat( $event ) {
      this.onClickItem.emit( $event );
      this.selected = $event;
  }

  setScrollChat( $event ) {
      this.scrollChat = $event.target.scrollTop;
  }

  heightFirstList() {
      return (parseInt( this.listBoxes.toArray()[ 0 ].listBox.nativeElement.style.height, 10 ));
  }

  heightSecondList() {
      return (parseInt( this.listBoxes.toArray()[ 1 ].itemContainer.nativeElement.style.height, 10 ));
  }

  setScrollFirstList() {
      this.listBoxes.toArray()[ 0 ].itemContainer.nativeElement.scrollTop = this.scrollChat;
  }

  isNotOffline( value ) {
      return value.status.toLowerCase() !== Offline.toLowerCase();
  }

}

