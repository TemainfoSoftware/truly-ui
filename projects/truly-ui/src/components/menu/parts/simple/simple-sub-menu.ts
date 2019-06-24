/*
 MIT License

 Copyright (c) 2019 Temainfo Sistemas

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
  Input, Component, OnDestroy, OnChanges, SimpleChanges, ViewChild, ElementRef, ChangeDetectorRef
} from '@angular/core';
import { Router } from '@angular/router';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';

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

  public itemHeight;

  public dockWidth;

  public link;

  public anchorElements = [];

  private callBack = Function();

  @ViewChild( 'subMenuList', {static: true} ) subMenuList: ElementRef;

  constructor( private router: Router, private change: ChangeDetectorRef ) {}

  setDataSubMenu( items ) {
    this.items = items;
    this.change.detectChanges();
  }

  setProperties( properties ) {
    Object.keys( properties ).forEach( ( item ) => {
      this[ item ] = properties[ item ];
    } );
  }

  setAnchorElement( item, element ) {
    if (item[this.subItem] && this.alreadyTaken(element).length === 0) {
      this.anchorElements.push({'rootElement': element, 'subItems': item[this.subItem]});
    }
  }

  isRouterActive(item) {
    return this.router.url === item[this.link];
  }

  alreadyTaken(element) {
    const anchor = this.anchorElements.filter((value) => {
      return value.rootElement === element;
    });
    return anchor;
  }

  callbackListElement( $event, item ) {
    $event.stopPropagation();
    if ( item[ this.link ] ) {
      return this.router.navigate( [ item[ this.link ] ] );
    }
    if ( item[ 'callBack' ] ) {
      this.callBack = item[ 'callBack' ];
      this.callBack( $event );
    }
  }

  getWidth() {
    return Math.round(parseInt(this.width, 10) + 1) + 'px';
  }

  ngOnChanges( changes: SimpleChanges ) {}

  ngOnDestroy() {}

}
