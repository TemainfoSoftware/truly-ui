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
  Component, AfterViewInit, Input, OnInit, QueryList,
  ViewChildren, Output, EventEmitter, forwardRef,
  Renderer2, ChangeDetectorRef, ChangeDetectionStrategy,
} from '@angular/core';
import { TlListBox } from '../listbox/listbox';

import { ChatListStatus } from './chatlist-status';
import { ChatListService } from './chatlist.service';
import { Subject } from 'rxjs';

@Component( {
  selector: 'tl-chatlist',
  templateUrl: './chatlist.html',
  styleUrls: [ './chatlist.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class TlChatList implements AfterViewInit, OnInit {

  @Input() data = [];

  @Input() searchInput;

  @Input() searchQuery;

  @Input() height = 300 / 2 + 'px';

  @Input() label = 'firstName';

  @Input() labelDetail = 'lastName';

  @Input() avatar = '';

  @Input() itemsToShow = 5;

  @Input() statusConfig: ChatListStatus;

  @Output() clickItem: EventEmitter<any> = new EventEmitter();

  // @ViewChildren( forwardRef( () => TlListBox ) ) listBoxes: QueryList<TlListBox>;

  public filtering = false;

  public filteredOnline = [];

  public filteredOffline = [];

  private subject = new Subject();

  private selected = '';

  constructor( public renderer: Renderer2, private change: ChangeDetectorRef,
               public chatListService: ChatListService ) {
  }

  ngOnInit() {
/*    this.chatListService.data = this.data;
    this.filterDataStatus( this.chatListService.data );
    this.handleStatusConfig();
    this.handleSearchInput();
    this.listenInput();*/
  }

  ngAfterViewInit() {
/*    this.subscribeStatusChange();
    this.detectChangesOfLists();*/
   }

/*  private subscribeStatusChange() {
    this.chatListService.subjectStatus.subscribe( ( value ) => {
      this.change.detectChanges();
      this.renderListBoxes();
    } );
  }

  private listenInput() {
    this.renderer.listen( this.searchInput.input.nativeElement, 'input', ( $event ) => {
      this.subject.next( $event.target.value );
    } );
  }

  private detectChangesOfLists() {
    this.change.markForCheck();
    this.listBoxes.forEach( ( item, index, array ) => {
      item.change.markForCheck();
    } );
  }

  private filterDataStatus( array ) {
    this.resetServiceLists();
    array.forEach( ( value ) => {
      this.isNotOffline( value ) ?
        this.chatListService.online.push( value ) : this.chatListService.offline.push( value );
    } );
    this.filteredOffline = this.chatListService.offline;
    this.filteredOnline = this.chatListService.online;
    this.chatListService.searchQuery = this.searchQuery;
    this.sortLists();
  }

  private sortLists() {
    this.chatListService.sortArray( this.chatListService.online );
    this.chatListService.sortArray( this.chatListService.offline );
  }

  private resetServiceLists() {
    this.chatListService.online = [];
    this.chatListService.offline = [];
  }

  private handleSearchInput() {
    if ( !this.searchInput ) {
      throw new Error( '[searchInput] property is required' );
    }
  }

  private handleStatusConfig() {
    if ( !this.statusConfig ) {
      throw new Error( '[statusConfig] property is required' );
    }
  }

  private renderListBoxes() {
    this.listBoxes.forEach( ( item ) => {
      item.renderPageData();
    } );
  }

  getStatus( item ) {
    return Object.keys( this.statusConfig ).find( (key => this.statusConfig[ key ] === item) );
  }

  onFilterData(data, list) {
    list === 'list1' ? this.filteredOnline = data : this.filteredOffline = data;
    this.change.detectChanges();
  }

  onClickItemChat( $event, string ) {
    this.clickItem.emit( $event );
    this.selected = $event;
    this.resetSelected( string );
  }

  private resetSelected( string ) {
    if ( string === 'list1' ) {
      return this.listBoxes.toArray()[ 1 ].removeSelected();
    }
    this.listBoxes.toArray()[ 0 ].removeSelected();
  }

  private isNotOffline( value ) {
    return value.status.toLowerCase() !== this.statusConfig[ 'offline' ].toLowerCase();
  }*/

}

