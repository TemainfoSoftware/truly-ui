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
import {
  Component, ContentChildren, QueryList,
  Input,
  AfterContentInit, Output, EventEmitter,
} from '@angular/core';

import { TlButtonGroupItem } from './buttongroup-item';

@Component( {
  selector: 'tl-button-group',
  templateUrl: './buttongroup.html',
  styleUrls: [ './buttongroup.scss' ]
} )
export class TlButtonGroup implements AfterContentInit {

  @Input() multiSelect = false;

  @Input() height = '30px';

  @Input() fontSize = '0.9em';

  @Input() useSelected = true;

  @Output() itemSelect: EventEmitter<Object> = new EventEmitter();

  @ContentChildren( TlButtonGroupItem ) groupItems: QueryList<TlButtonGroupItem>;

  constructor() {}

  ngAfterContentInit() {
    if ( this.useSelected ) {
      const selectedTab = this.groupItems.find( tab => tab.selected );
      if ( !selectedTab && this.groupItems.first ) {
        this.groupItems.first.selected = true;
      }
    }
  }

  selectButtonItem( groupItem: TlButtonGroupItem, event ) {
    groupItem.selected = !groupItem.selected;
    if ( !this.multiSelect ) {
      this.groupItems.forEach( item => {
        if ( item !== groupItem ) {
          item.selected = false;
        }
      } );
    }
    this.itemSelect.emit(this.groupItems.filter( item => item.selected));
    groupItem.emitClick(event);
  }

  get groupContext() {
    return {
      groupItems: this.groupItems
    };
  }

}
