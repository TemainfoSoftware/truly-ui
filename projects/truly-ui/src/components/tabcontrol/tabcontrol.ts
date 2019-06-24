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
  Component, ContentChildren, QueryList, forwardRef, Input, AfterContentInit, ViewChild, AfterViewInit, Renderer2,
} from '@angular/core';

import { TlTab } from './tab/tab';
import { TlModal } from '../modal/modal';
import { KeyEvent } from '../core/enums/key-events';
import {FixedPositionDirective} from '../misc/fixed-position.directive';

@Component( {
    selector: 'tl-tabcontrol',
    templateUrl: './tabcontrol.html',
    styleUrls: [ './tabcontrol.scss' ]
} )
export class TlTabControl implements AfterContentInit, AfterViewInit {

    @Input( 'height' ) height = 'auto';

    @Input( 'tabsHeight' ) tabsHeight = '25px';

    @ViewChild('tabsHeader', {static: true}) tabsHeader;

    @ViewChild('wrapperTab', {static: true}) wrapper;

    @ViewChild('line', {static: true}) line;

    @ContentChildren( forwardRef(() => TlTab )) tabs: QueryList<TlTab>;

    @ViewChild( forwardRef(() => TlModal ), {static: true}) modal: QueryList<TlModal>;

    private elementListTabs;

    public widthSeparator = '';

    public widthTabs = 0;

    public widthWrapper = 0;

    public topPosition = 0;

    constructor(private renderer: Renderer2 ) {}

    ngAfterContentInit() {
      const selectedTab = this.tabs.find(tab => tab.selected);
      if (!selectedTab && this.tabs.first) {
        this.tabs.first.selected = true;
      }
      this.setTabProperties();
      this.getElementList();
    }

    ngAfterViewInit() {
      this.getWrapperWidth();
      this.getTabsComponent();
    }

    getTabsComponent() {
      this.tabs.forEach( ( item, index ) => {
        this.listenLastElementTab( item.lastComponent, index );
        this.listenPreviousElementTab( item.firstComponent, index );
      } );
    }

    listenLastElementTab( last, index ) {
      if ( last ) {
        this.renderer.listen( last, 'keydown', ( $event ) => {
          this.handleKeyDownLastElementTab( $event, index );
        } );
      }
    }

    listenPreviousElementTab( first, index ) {
      if ( first ) {
        this.renderer.listen( first, 'keydown', ( $event ) => {
          this.handleKeyDownFirstElementTab( $event, index );
        } );
      }
    }

    handleKeyDownLastElementTab( $event, index ) {
      if ( [ KeyEvent.TAB, KeyEvent.ENTER, KeyEvent.ARROWDOWN ].indexOf( $event.keyCode ) >= 0 && (!$event.shiftKey) ) {
        this.nextTabAndElement( index );
      }
      if ( ($event.keyCode === KeyEvent.TAB) && ($event.ctrlKey) ) {
        this.nextTabAndElement( index );
      }
    }

    handleKeyDownFirstElementTab( $event, index ) {
      if ( [ KeyEvent.ARROWUP ].indexOf( $event.keyCode ) >= 0 ) {
        this.previousTabAndElement( index );
      }
      if ( ($event.keyCode === KeyEvent.TAB) && ($event.shiftKey) ) {
        this.previousTabAndElement( index );
      }
    }

    nextTabAndElement( index ) {
      if ( this.tabs.toArray()[ index + 1 ] ) {
        this.resetTabsSelected();
        this.tabs.toArray()[ index + 1 ].selected = true;
        this.setFocusNext( index + 1 );
      }
    }

    previousTabAndElement( index ) {
      if ( this.tabs.toArray()[ index - 1 ] ) {
        this.resetTabsSelected();
        this.tabs.toArray()[ index - 1 ].selected = true;
        this.setFocusPrevious( index - 1 );
      }
    }

    selectTab(tab: TlTab) {
      this.tabs.forEach(item => item.selected = false);
      tab.selected = true;
    }

    getWrapperWidth() {
      this.widthWrapper = Math.round( this.wrapper.nativeElement.offsetWidth );
    }

    getElementList() {
      setTimeout(() => {
        const templateChildren = this.tabsHeader.elementRef.nativeElement.parentElement.children;
        for (let element = 0; element < templateChildren.length; element++) {
          if (templateChildren[element].localName === 'ul') {
            this.elementListTabs = templateChildren[element].children;
          }
        }
        this.setWidthSeparator();
      }, 1);
    }

    setFocusNext( index ) {
      setTimeout( () => {
        this.tabs.toArray()[ index ].firstComponent.focus();
      }, 1 );
    }

    setFocusPrevious( index ) {
      setTimeout( () => {
        this.tabs.toArray()[ index ].lastComponent.focus();
      }, 1 );
    }

    setTabProperties() {
      this.tabs.forEach( ( item ) => {
        item.height = this.height;
      } );
    }

    setWidthSeparator() {
      this.widthTabs = 0;
      for (let i = 0; i < this.elementListTabs.length; i++) {
        this.widthTabs = this.widthTabs + Number(this.elementListTabs[i].offsetWidth);
      }
      this.topPosition = (this.line.nativeElement.offsetHeight / 2) - 1;
      this.widthSeparator = 'calc(100% - ' + (this.widthTabs) + 'px' + ' )';
    }

    resetTabsSelected() {
      this.tabs.forEach( ( item ) => {
        item.selected = false;
      } );
    }

    get tabsContext() {
      return {
        tabs: this.tabs
      };
    }

}


