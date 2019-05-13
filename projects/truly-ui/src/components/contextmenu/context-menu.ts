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

import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ContextMenuInterface} from './interfaces/context-menu.interface';

@Component({
  selector: 'tl-context-menu',
  templateUrl: './context-menu.html',
  styleUrls: ['./context-menu.scss'],
})
export class TlContextMenuComponent implements OnInit {

  public contextMenu: ContextMenuInterface[];

  private currentContext;

  @Output() select: EventEmitter<any> = new EventEmitter();

  constructor(private changes: ChangeDetectorRef) {}

  ngOnInit() {}

  init( items: ContextMenuInterface[], context ) {
    this.contextMenu = items;
    this.currentContext = context;
    this.changes.detectChanges();
  }

  onClickItem( callback ) {
    if (callback) {
      this.select.emit();
      return this.currentContext ? callback(this.currentContext) : callback();
    }
  }

}
