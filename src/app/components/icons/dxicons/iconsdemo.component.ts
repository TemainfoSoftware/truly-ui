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
import { Component, ElementRef, ViewChild } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component( {
  selector : 'app-icons',
  templateUrl : './iconsdemo.component.html',
  styleUrls : [ './iconsdemo.component.scss' ],
  animations: [
    trigger(
      'enterAnimation', [
        transition( ':enter', [
          style( { opacity: 0 } ),
          animate( '250ms', style( { opacity: 1 } ) )
        ] ),
        transition( ':leave', [
          style( { opacity: 1 } ),
          animate( '250ms', style( { opacity: 0 } ) )
        ] )
      ]
    )
  ]
} )
export class IconsDemoComponent {

  @ViewChild('inputCopy', {static: false}) inputCopy: ElementRef<any>;

  public filter: string;

  public cheatsheet = false;

  public copy: string;

  public saved: string;

  public interval;

  public outputIcon;

  public dataIcons = ['add', 'airplane', 'bookmark', 'box', 'car', 'card', 'cart', 'chart', 'check', 'clear', 'clock', 'close', 'coffee',
    'comment', 'doc', 'download', 'dragvertical', 'edit', 'email', 'event', 'favorites', 'find', 'filter-operation-equals', 'filter',
    'filter-operation-not-equals', 'filter-operation-less', 'filter-operation-less-equal', 'filter-operation-greater',
    'filter-operation-greater-equal', 'filter-operation-contains', 'filter-operation-not-contains', 'filter-operation-starts-with',
    'filter-operation-ends-with', 'folder', 'food', 'gift', 'globe', 'group', 'help', 'home', 'image', 'info', 'key', 'like', 'map',
    'menu', 'message', 'money', 'music', 'overflow', 'percent', 'photo', 'plus', 'preferences', 'product', 'pulldown', 'refresh', 'remove',
    'revert', 'runner', 'save', 'search', 'tags', 'tel', 'tips', 'todo', 'toolbox', 'trash', 'user', 'upload', 'floppy', 'arrowleft',
    'arrowdown', 'arrowright', 'arrowup', 'spinleft', 'spinright', 'spinnext', 'spinprev', 'spindown', 'spinup', 'chevronleft',
    'chevronright', 'chevronnext', 'chevronprev', 'chevrondown', 'chevronup', 'chevrondoubleleft', 'chevrondoubleright', 'equal',
    'notequal', 'less', 'greater', 'lessorequal', 'greaterorequal', 'sortup', 'sortdown', 'sortuptext', 'sortdowntext', 'sorted', 'expand',
    'collapse', 'columnfield', 'rowfield', 'datafield', 'fields', 'fieldchooser', 'columnchooser', 'pin', 'unpin', 'pinleft', 'pinright',
    'contains', 'startswith', 'endswith', 'doesnotcontain', 'range', 'export', 'exportxlsx', 'exportpdf', 'exportselected', 'warning',
    'more', 'square', 'clearsquare', 'back', 'repeat', 'selectall', 'unselectall', 'print'];

  constructor() {}

  filterIcon(array) {
    if ( array.length === 0 || this.filter === undefined || this.filter.trim() === '' ) {
      return array;
    }

    return array.filter( (v) => v.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0 );
  }

  toggleCheatsheet() {
    this.cheatsheet = !this.cheatsheet;
  }

  copyIcon(icon) {
    this.onMouseLeave();
    if ( this.cheatsheet ) {
      this.outputIcon = `dx-icon dx-icon-${ icon }`;
    } else {
      this.outputIcon = `<tl-icon [lib]="'dx'">${ icon }</tl-icon>`;
    }
    setTimeout(() => {
      this.inputCopy.nativeElement.select();
      document.execCommand('copy');
      this.showCopyMessage(icon);
    });
  }

  showCopyMessage(icon) {
    this.saved = icon;
    clearInterval( this.interval );
    this.interval = setInterval( () => {
      this.saved = '';
    }, 1000 );
  }

  onMouseOver(icon) {
    this.copy = icon;
  }

  onMouseLeave() {
    this.copy = '';
  }

}

