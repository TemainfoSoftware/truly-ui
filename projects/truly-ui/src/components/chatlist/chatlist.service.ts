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

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ChatListService {

  public data = [];

  public online = [];

  public offline = [];

  public searchQuery = '';

  public subjectStatus = new Subject();

  constructor() {}

  changeStatus( item, newstatus ) {
    item.row.status = newstatus;
    this.handleChangeOffline( item, newstatus );
    this.subjectStatus.next({'online': this.online, 'offline': this.offline});
  }

  private handleChangeOffline( item, newstatus ) {
    if ( newstatus === 'Offline' ) {
      if ( this.offline.indexOf( item.row ) > 0 ) {
        return;
      }
      this.online.splice( this.online.indexOf( item.row ), 1 );
      this.offline.push( item.row );
      this.sortArraysStatus();
      return;
    }
    this.handleNotOffline( item );
  }

  private handleNotOffline( item ) {
    if ( item.status !== 'Offline' ) {
      if ( this.online.indexOf( item.row ) < 0 ) {
        this.offline.splice( this.offline.indexOf( item.row ), 1 );
        this.online.push( item.row );
      }
    }
  }

  sortArraysStatus() {
    this.sortArray( this.online );
    this.sortArray( this.offline );
  }

  sortArray( array: any[] ) {
    array.sort( ( a, b ) => {
      const x = a[ this.searchQuery ].toLowerCase();
      const y = b[ this.searchQuery ].toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    } );
  }

}
