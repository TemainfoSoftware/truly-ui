/*
 MIT License

 Copyright (c) 2018 Temainfo Software

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
  ViewChildren, Output, EventEmitter, forwardRef,
  ViewChild, KeyValueDiffers, DoCheck, Renderer2,
} from '@angular/core';

import { TabIndexService } from '../form/tabIndex.service';
import { IdGeneratorService } from '../core/helper/idgenerator.service';
import { NameGeneratorService } from '../core/helper/namegenerator.service';
import { ComponentDefaultBase } from '../core/base/component-default.base';
import { TlListBox } from '../listbox/listbox';
import { ChatListStatus } from './chatlist-status';
import { ChatListService } from './chatlist.service';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/debounceTime';

@Component( {
    selector: 'tl-chatlist',
    templateUrl: './chatlist.html',
    styleUrls: [ './chatlist.scss' ]
} )
export class TlChatList extends ComponentDefaultBase implements AfterViewInit, OnInit, DoCheck {

  @Input() data = [];

  @Input() searchInput;

  @Input() searchQuery;

  @Input() itemsToShow = 5;

  @Input() statusConfig: ChatListStatus;

  @Output() clickItem: EventEmitter<any> = new EventEmitter();

  @ViewChildren( forwardRef( () => TlListBox ) ) listBoxes: QueryList<TlListBox>;

  @ViewChild( 'overflow' ) overflow: ElementRef;

  public differ;

  public scrollChat;

  public filteredData = [];

  public filtering = false;

  private subject = new Subject();

  private selected = '';

  constructor( tabIndexService: TabIndexService, idService: IdGeneratorService, nameService: NameGeneratorService,
               differs: KeyValueDiffers,
               public renderer: Renderer2,
               public chatListService: ChatListService, private chat: ElementRef ) {
    super( tabIndexService, idService, nameService );
    this.differ = differs.find( {} ).create();
  }

  ngOnInit() {
      this.chatListService.data = this.data;
      this.filterDataStatus(this.chatListService.data);
  }

  ngAfterViewInit() {
      this.setElement( this.chat, 'tl-chatlist' );
      this.listenInputSearch();
      this.subject.debounceTime( 500 ).subscribe( searchTextValue => {
        this.handlefilterData( searchTextValue );
      } );
  }

  filterDataStatus(array) {
    this.chatListService.online = [];
    this.chatListService.offline = [];
    array.forEach( ( value ) => {
          this.isNotOffline( value ) ?
              this.chatListService.online.push( value ) : this.chatListService.offline.push( value );
      } );
    this.chatListService.searchQuery = this.searchQuery;
    this.chatListService.sortArray( this.chatListService.online );
    this.chatListService.sortArray( this.chatListService.offline );
  }

  listenInputSearch() {
    this.renderer.listen(this.searchInput.input.nativeElement, 'keyup', ($event) => {
      this.subject.next($event.target.value);
    });
  }

  getStatus(item) {
    return Object.keys(this.statusConfig).find((key => this.statusConfig[key] === item));
  }

  handleScrollChat( $event ) {
      this.setScrollChat( $event );
      this.setScrollFirstList();
      this.calculateScrollChat();
  }

  calculateScrollChat() {
    if ( this.scrollChat + this.heightSecondList() >= this.heightFirstList() ) {
      this.listBoxes.toArray()[ 1 ].itemContainer.nativeElement.scrollTop =
        (this.scrollChat - this.heightFirstList());
    }
  }

  handlefilterData( searchTerm ) {
    !searchTerm ? this.handleFilterAsEmpty() : this.filterData(searchTerm);
  }

  filterData(searchTerm) {
    this.filtering = true;
    this.filteredData = [];
    this.data.forEach( ( item ) => {
      if (item[this.searchQuery].substr(0, searchTerm.length).toLowerCase().includes(searchTerm.toLowerCase())) {
        if (this.filteredData.indexOf(item) < 0) {
          this.filteredData.push(item);
        }
      }
    } );
    this.filterDataStatus(this.filteredData);
  }

  handleFilterAsEmpty() {
    this.filtering = false;
    this.filterDataStatus(this.chatListService.data);
  }

  onClickItemChat( $event ) {
      this.clickItem.emit( $event );
      this.selected = $event;
      this.setInputFocus();
  }

  setInputFocus() {
    setTimeout(() => {
      this.searchInput.input.nativeElement.focus();
    }, 1);
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
      return value.status.toLowerCase() !== this.statusConfig['offline'].toLowerCase();
  }

  ngDoCheck() {
    const online = this.differ.diff( this.chatListService.online );
    if ( online && this.listBoxes ) {
        this.listBoxes.forEach((item) => {
          item.renderPageData();
        });
    }
  }

}

