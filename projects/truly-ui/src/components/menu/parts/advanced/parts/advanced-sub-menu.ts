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
  Component, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef, Renderer2
} from '@angular/core';
import { Router } from '@angular/router';
import { TlAdvancedRootMenu } from '../advanced-root-menu';
import { RelativeWindowPosition } from '../../../../misc/relative-window-position.directive';
import { Subject } from 'rxjs';
import { SubMenuService } from '../../../services/submenu.service';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';

@Component( {
  selector: 'tl-advanced-sub-menu',
  templateUrl: './advanced-sub-menu.html',
  styleUrls: [ './advanced-sub-menu.scss' ],
} )
export class TlAdvancedSubMenu implements AfterViewInit {

  public icon = '';

  public label = '';

  public subItem = '';

  public items = [];

  public docked = false;

  public width = '';

  public dockWidth = '';

  public itemHeight = '';

  public group = '';

  public operationMode = '';

  public anchorElements = [];

  public parentNode;

  public callBack = Function();

  public previousMenu;

  public visibilitySubMenu = false;

  public leftPosition = '';

  public listMenuElements = [];

  public fixed = false;

  public menuService;

  public onSubMenuLoad: Subject<boolean> = new Subject<boolean>();

  private index = 0;

  private link = '';

  private relativeWindowPosition: RelativeWindowPosition = new RelativeWindowPosition();

  @ViewChild( 'subMenuList', {static: true} ) subMenuList: ElementRef;

  constructor( private router: Router, private change: ChangeDetectorRef, private renderer: Renderer2 ) {
  }

  ngAfterViewInit() {
    this.onSubMenuLoad.next(true);
    this.change.detectChanges();
  }

  setMenuService(menuService: SubMenuService) {
    this.menuService = menuService;
  }

  setDataSubMenu( items ) {
    this.items = items;
  }

  setProperties( properties ) {
    Object.keys( properties ).forEach( ( item ) => {
      this[ item ] = properties[ item ];
    } );
  }

  setAnchorElement( item, element ) {
    if ( item[ this.subItem ] && this.alreadyTaken( element ).length === 0 ) {
      this.anchorElements.push( {
        'rootElement': element,
        'subItems': item[ this.subItem ],
        'subMenu': null
      } );
    }
  }

  toggleSubMenu( element ) {
    const mathContent = this.isContentMath( element );
    if ( mathContent.length > 0 ) {
      mathContent[ 0 ].subMenu.toggleVisibility( element );
    }
  }

  onHoverSubMenu( element ) {
    if (!this.isOperationModeHover()) {
      return;
    }
    const mathContent = this.isContentMath( element );
    if ( mathContent.length > 0 ) {
      mathContent[ 0 ].subMenu.visibilitySubMenu = true;
      mathContent[ 0 ].subMenu.setPosition();
    }
  }

  onLeaveSubMenu( element ) {
    if (!this.isOperationModeHover()) {
      return;
    }
    const mathContent = this.isContentMath( element );
    if ( mathContent.length > 0 ) {
      mathContent[ 0 ].subMenu.visibilitySubMenu = false;
    }
  }

  isOperationModeHover() {
    return this.operationMode === 'hover';
  }

  isContentMath( element ) {
    return this.anchorElements.filter( ( value, index, array ) => {
      return value[ 'rootElement' ] === element;
    } );
  }

  toggleVisibility( element? ) {
    this.visibilitySubMenu = !this.visibilitySubMenu;
    this.getListMenuElements();
    this.handleNextSubMenuVisibility( element );
    this.setPosition();
  }

  callbackListElement( $event, item ) {
    $event.stopPropagation();
    if ( item[ this.link ] ) {
      this.menuService.closeMenu();
      return this.router.navigate( [ item[ this.link ] ] );
    }
    this.handleCallbackItem( item, $event );
  }

  handleCallbackItem( item, $event ) {
    if ( item[ 'callback' ] ) {
      this.callBack = item[ 'callback' ];
      this.callBack( $event );
      this.menuService.closeMenu();
    }
  }

  handleNextSubMenuVisibility( element ) {
    const nestedSubMenu = this.isContentMath( element )[ 0 ];
    if ( !element || !nestedSubMenu ) {
      return;
    }
    if ( nestedSubMenu.subItem.visibilitySubMenu ) {
      nestedSubMenu.subItem.toggleVisibility();
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

  onArrowDown( $event ) {
    $event.preventDefault();
    $event.stopPropagation();
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

  onArrowRight( $event, element ) {
    $event.stopPropagation();
    if ( this.isContentMath( element ).length > 0 ) {
      this.isContentMath( element )[ 0 ].subMenu.toggleVisibility();
    }
  }

  onArrowUp( $event ) {
    $event.preventDefault();
    $event.stopPropagation();

    if ( this.listMenuElements[ this.index - 1 ] ) {
      this.index--;
      this.setFocusElement();
    }
  }

  setFocusElement() {
    this.listMenuElements[ this.index ].focus();
  }

  alreadyTaken( element ) {
    return this.anchorElements.filter( ( value ) => {
      return value.rootElement === element;
    } );
  }

  close() {
    this.visibilitySubMenu = false;
  }

  setPosition() {
    const dislocation = this.isPreviousRootMenu() ?
      this.menuService.menu.instance.innerScrollWrapper : 0;
    this.relativeWindowPosition.setRenderer(this.renderer);
    this.relativeWindowPosition.setAnchorElement( this.parentNode );
    this.relativeWindowPosition.setRelativeElement( this.subMenuList.nativeElement );
    this.relativeWindowPosition.setPosition(dislocation);
  }

  isPreviousRootMenu() {
    return this.previousMenu instanceof TlAdvancedRootMenu;
  }

}
