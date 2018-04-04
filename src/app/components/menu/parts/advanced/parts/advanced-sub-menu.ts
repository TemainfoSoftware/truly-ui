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
  Component, ElementRef, ViewChild, OnInit, AfterViewInit
} from '@angular/core';
import { Router } from '@angular/router';
import { TlAdvancedRootMenu } from '../advanced-root-menu';

@Component( {
  selector: 'tl-advanced-sub-menu',
  templateUrl: './advanced-sub-menu.html',
  styleUrls: [ './advanced-sub-menu.scss' ],
} )
export class TlAdvancedSubMenu implements OnInit, AfterViewInit {

  public icon = '';

  public label = '';

  public subItem = '';

  public items = [];

  public docked = false;

  public width;

  public dockWidth;

  public group;

  public titleMenu = '';

  public anchorElements = [];

  public parentNode;

  public callBack = Function();

  public nextSubMenu: TlAdvancedSubMenu;

  public previousMenu;

  public visibilitySubMenu = false;

  public topPosition = '';

  public leftPosition = '';

  public listMenuElements = [];

  public fixed = false;

  private index = 0;

  private link;

  @ViewChild( 'subMenuList' ) subMenuList: ElementRef;

  constructor( private router: Router ) {
  }

  ngOnInit() {
    this.setLeftPosition();
    this.setTopPosition();
  }

  ngAfterViewInit() {
  }

  setDataSubMenu( items ) {
    this.items = items;
  }

  setProperties( properties ) {
    this.icon = properties.icon;
    this.label = properties.label;
    this.subItem = properties.subItem;
    this.docked = properties.docked;
    this.width = properties.width;
    this.dockWidth = properties.dockWidth;
    this.group = properties.group;
    this.titleMenu = properties.titleMenu;
    this.link = properties.link;
  }

  setAnchorElement( item, element ) {
    if ( item[ this.subItem ] && this.alreadyTaken( element ).length === 0 ) {
      this.anchorElements.push( { 'rootElement': element, 'subItems': item[ this.subItem ], 'subMenu': null } );
    }
  }

  toggleSubMenu( element, subItem, $event ) {
    if ( subItem ) {
      if ( this.isTargetListElement( element, $event.target ) ) {
        this.isContentMath(element)[0].subMenu.toggleVisibility();
      }
    }
  }

  isContentMath(element) {
    return this.anchorElements.filter((value, index, array) => {
      return value['rootElement'] === element;
    });
  }

  toggleVisibility() {
    this.visibilitySubMenu = !this.visibilitySubMenu;
    this.getListMenuElements();
    this.handleNextSubMenuVisibility();
    this.setTopPosition();
  }

  callbackListElement( $event, item ) {
    $event.stopPropagation();
    if ( item[ this.link ] ) {
      return this.router.navigate( [ item[ this.link ] ] );
    }
    if ( item[ 'callback' ] ) {
      this.callBack = item[ 'callback' ];
      this.callBack( $event );
    }
  }

  handleNextSubMenuVisibility() {
    if ( this.nextSubMenu ) {
      if ( this.nextSubMenu.visibilitySubMenu ) {
        this.nextSubMenu.toggleVisibility();
      }
    }
  }

  getListMenuElements() {
    for ( const child of this.subMenuList.nativeElement.children ) {
      if ( child.nodeName === 'LI' ) {
        this.listMenuElements.push( child );
      }
    }
    this.setFocusFirstElement();
  }

  setFocusFirstElement() {
    setTimeout( () => {
      this.listMenuElements[ 0 ].focus();
    }, 100 );
  }

  onArrowDown() {
    if ( this.listMenuElements[ this.index + 1 ] ) {
      this.index++;
      this.setFocusElement();
    }
  }

  onArrowLeft() {
    this.visibilitySubMenu = false;
    if ( this.previousMenu instanceof TlAdvancedSubMenu ) {
      setTimeout( () => {
        this.previousMenu.setFocusElement();
        return;
      }, 100 );
    }
    this.previousMenu.setFocusElement();

  }

  onArrowRight() {
    const elementFocused = document.activeElement;
    const children = Array( elementFocused.getElementsByTagName( 'li' ) );
    if ( children[ 0 ].length > 0 && !this.nextSubMenu.visibilitySubMenu ) {
      this.nextSubMenu.toggleVisibility();
    }
  }

  onArrowUp() {
    if ( this.listMenuElements[ this.index - 1 ] ) {
      this.index--;
      this.setFocusElement();
    }
  }

  setFocusElement() {
    this.listMenuElements[ this.index ].focus();
  }

  isTargetListElement( element, target ) {
    for ( const item of element.children ) {
      if ( item === target ) {
        return true;
      }
    }
    return false;
  }

  alreadyTaken( element ) {
    return this.anchorElements.filter( ( value ) => {
      return value.rootElement === element;
    } );
  }

  setLeftPosition() {
    const border = 1;
    const padding = this.isPreviousRootMenu() ? 0 : 10;
    this.leftPosition = parseInt( this.width, 10 ) + padding + border + 'px';
  }

  setTopPosition() {
    const position = this.isPreviousRootMenu() ?
      this.parentNode.offsetTop - this.previousMenu.innerScrollWrapper + 5 : this.parentNode.offsetTop;
    this.topPosition = position + 'px';
  }

  isPreviousRootMenu() {
    return this.previousMenu instanceof TlAdvancedRootMenu;
  }

}
