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
  Input, Component, OnDestroy, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';

@Component( {
  selector: 'tl-simple-sub-menu',
  templateUrl: './simple-sub-menu.html',
  styleUrls: [ './simple-sub-menu.scss' ],
} )
export class TlSimpleSubMenu implements OnChanges, OnDestroy {

  public icon = '';

  public label = '';

  public subItem = '';

  public items = [];

  public docked = false;

  public width;

  public dockWidth;

  public anchorElements = [];

  @ViewChild( 'subMenuList' ) subMenuList: ElementRef;

  setDataSubMenu( items ) {
    this.items = items;
  }

  setProperties( properties ) {
    this.icon = properties.icon;
    this.label = properties.label;
    this.subItem = properties.subItem;
    this.docked = properties.docked;
    this.width = properties.width;
    this.dockWidth = properties.dockWith;
  }

  setAnchorElement( item, element ) {
    if (item[this.subItem] && this.alreadyTaken(element).length === 0) {
      this.anchorElements.push({'rootElement': element, 'subItems': item[this.subItem]});
    }
  }

  alreadyTaken(element) {
    const anchor = this.anchorElements.filter((value) => {
      return value.rootElement === element;
    });
    return anchor;
  }

  getWidth() {
    return Math.round(parseInt(this.width, 10) + 1) + 'px';
  }

  ngOnChanges( changes: SimpleChanges ) {}

  ngOnDestroy() {}

}
