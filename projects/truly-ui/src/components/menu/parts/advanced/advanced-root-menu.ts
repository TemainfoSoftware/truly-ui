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
  Component, ElementRef, ViewChild, AfterContentInit, ChangeDetectorRef,
} from '@angular/core';

import { trigger, transition, style, animate } from '@angular/animations';
import { Subject } from 'rxjs';



import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/internal/operators';
import { TlAdvancedSubMenu } from './parts/advanced-sub-menu';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';

@Component( {
  selector: 'tl-advanced-root-menu',
  templateUrl: './advanced-root-menu.html',
  styleUrls: [ './advanced-root-menu.scss' ],
  animations: [
    trigger(
      'rootElementList', [
        transition( ':enter', [
          style( { transform: 'translateY(5%)', opacity: 0 } ),
          animate('250ms', style({transform: 'translateY(0)', opacity: 1}))
        ] ),
        transition( ':leave', [
          style( { transform: 'translateY(0)', opacity: 1 } ),
          animate('250ms', style({transform: 'translateY(100%)', opacity: 0}))
        ] )
      ]
    )
  ],
} )
export class TlAdvancedRootMenu implements AfterContentInit {

  public icon = '';

  public label = '';

  public subItem = '';

  public items = [];

  public docked = false;

  public width = '';

  public dockWidth = '';

  public group = '';

  public charsToSearch = 0;

  public topDislocation = 0;

  public titleMenu = '';

  public anchorElements = [];

  public widthRootMenu = '';

  public visibilityMenu = false;

  public operationMode = '';

  public topPosition = '';

  public filterEmptyMessage = '';

  public inputPlaceholder = '';

  public itemHeight = '';

  public rootItemHeight = '';

  public groups = [];

  public model: string;

  public innerScrollWrapper = 0;

  public maxHeight = '';

  public callBack = Function();

  public nothingFound = false;

  public onRootMenuLoad: Subject<boolean> = new Subject<boolean>();

  public onChangeItems: Subject<boolean> = new Subject<boolean>();

  private modelChanged: Subject<string> = new Subject<string>();

  private filteredMenu = [];

  private subMenuService;

  private index = 0;

  private link = '';

  private listMenuElements;

  @ViewChild( 'subMenuList', {static: true} ) subMenuList: ElementRef;

  @ViewChild( 'wrapperItemsList', {static: true} ) wrapperItemsList: ElementRef;

  @ViewChild( 'input', {static: true} ) inputElement: ElementRef;

  @ViewChild( 'wrapperItems', {static: true} ) wrapperItems: ElementRef;

  constructor( private change: ChangeDetectorRef, private router: Router ) {
    this.modelChanged.pipe(
      debounceTime( 200 ),
      distinctUntilChanged( ( oldValue, newValue ) => oldValue === newValue ),
      filter( ( searchTerm ) => {
        if ( this.isTermGreaterThanChars( searchTerm ) ) { return true;
        } else if ( this.isTermLengthEqualsZero( searchTerm ) ) {
          this.rebuildMenu();
          return false;
        }
        return false;
      }),
    ).subscribe( model => this.filterMenuItem( model ) );
  }

  ngAfterContentInit() {
    this.onRootMenuLoad.next( true );
    this.setTopPosition();
    this.getListMenuElements();
  }

  setDataSubMenu( items ) {
    this.items = items;
    this.filterCategory( this.items );
    this.change.detectChanges();
  }

  setProperties( properties ) {
    Object.keys( properties ).forEach( ( item ) => {
      this[ item ] = properties[ item ];
    } );
  }

  getListMenuElements() {
    this.listMenuElements = this.subMenuList.nativeElement.getElementsByClassName( 'ng-trigger-rootElementList' );
  }

  isTermLengthEqualsZero( searchTerm ) {
    return String( searchTerm ).length === 0;
  }

  isTermGreaterThanChars( searchTerm ) {
    return String( searchTerm ).length >= this.charsToSearch;
  }

  filterCategory( array ) {
    this.groups = [];
    array.forEach( ( value ) => {
      if ( !this.existGroup( value.category ) ) {
        this.groups.push( { group: value.category, items: this.getItemsCategory( value.category, array ) } );
      }
    } );
  }

  changeInputValue( value ) {
    this.modelChanged.next( value.trim() );
  }

  filterMenuItem( value ) {
    this.filteredMenu = [];
    this.items.forEach( ( menu ) => {
      if ( this.mathWithTerm( menu, value ) && !menu[ this.subItem ] ) {
        this.filteredMenu.push( menu );
      }
      if ( menu[ this.subItem ] ) {
        this.filterSubItem( menu[ this.subItem ], value, menu );
      }
    } );
    this.handleDataFiltered();
  }

  handleDataFiltered() {
    this.nothingFound = this.hasDataFound();
    this.filterCategory( this.filteredMenu );
    this.change.detectChanges();
  }

  mathWithTerm( menu, value ) {
    return menu[ this.label ].toLowerCase().substr( 0, value.length ).includes( value.toLowerCase() );
  }

  hasDataFound() {
    return this.filteredMenu.length === 0;
  }

  close() {
    this.visibilityMenu = false;
  }

  rebuildMenu() {
    this.nothingFound = false;
    this.subMenuService.resetAdvancedMenu();
    this.subMenuService.createAdvancedMenu();
    this.setDataSubMenu( this.items );
    this.onChangeItems.next( true );
    this.setInputFocus();
  }

  onArrowDown( $event ) {
    $event.preventDefault();
    if ( this.isFocusInput() ) {
      this.index = 0;
      this.setFocusElement();
      return;
    }
    if ( this.existListElement( this.index + 1 ) ) {
      this.index++;
      this.setFocusElement();
    }
  }

  onArrowLeft( $event ) {
    $event.preventDefault();
  }

  onArrowRight( $event, element ) {
    $event.stopPropagation();
    if ( this.isContentMath( element ).length > 0 ) {
      this.isContentMath( element )[ 0 ].subMenu.toggleVisibility();
    }
  }

  onArrowUp( $event ) {
    $event.preventDefault();
    if ( this.isFocusInput() ) {
      return;
    }
    if ( this.existListElement( this.index - 1 ) ) {
      this.index--;
      return this.listMenuElements[ this.index ].focus();
    }
    this.setInputFocus();
  }

  onScrollWrapper() {
    this.innerScrollWrapper = this.wrapperItemsList.nativeElement.scrollTop;
    this.closeAllSubMenus();
  }

  onHoverSubMenu( element ) {
    if ( !this.isOperationModeHover() ) {
      return;
    }
    const mathContent = this.isContentMath( element );
    if ( mathContent.length > 0 ) {
      mathContent[ 0 ].subMenu.setPosition();
      mathContent[ 0 ].subMenu.visibilitySubMenu = true;
    }
  }

  onLeaveSubMenu( element ) {
    if ( !this.isOperationModeHover() ) {
      return;
    }
    const mathContent = this.isContentMath( element );
    if ( mathContent.length > 0 ) {
      mathContent[ 0 ].subMenu.setPosition();
      mathContent[ 0 ].subMenu.visibilitySubMenu = false;
    }
  }

  isOperationModeHover() {
    return this.operationMode === 'hover';
  }

  closeAllSubMenus() {
    this.subMenuService.getSubMenus().forEach( ( item ) => {
      (<TlAdvancedSubMenu>item.instance).close();
    } );
  }

  setFocusElement() {
    this.listMenuElements[ this.index ].focus();
  }

  existListElement( index ) {
    return this.listMenuElements[ index ];
  }

  isFocusInput() {
    return document.activeElement === this.inputElement.nativeElement;
  }

  callbackListElement( $event, item ) {
    $event.stopPropagation();
    if ( item[ this.link ] ) {
      this.visibilityMenu = false;
      return this.router.navigate( [ item[ this.link ] ] );
    }
    this.handleCallbackItem( item, $event );
  }

  handleCallbackItem( item, $event ) {
    if ( item[ 'callBack' ] ) {
      this.callBack = item[ 'callBack' ];
      this.callBack( $event );
      this.visibilityMenu = false;
    }
  }

  filterSubItem( array, value, menu ) {
    array.forEach( ( submenu ) => {
      if ( this.mathWithTerm( submenu, value ) && !submenu[ this.subItem ] ) {
        this.filteredMenu.push( submenu );
      }
      if ( submenu[ this.subItem ] ) {
        this.filterSubItem( submenu[ this.subItem ], value, menu );
      }
    } );
  }

  getItemsCategory( category, array ) {
    return array.filter( ( value2 ) => {
      return value2.category === category;
    } );
  }

  existGroup( category ) {
    for ( const item of this.groups ) {
      if ( item.group === category ) {
        return true;
      }
    }
    return false;
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

  toggleSubMenu( element, subItem, $event ) {
    if ( !subItem ) {
      return;
    }
    if ( this.isTargetEqualsElement( element, $event.target )
      || this.isTargetListElement( element, $event.target ) ) {
      this.closeAllSubMenus();
      this.isContentMath( element )[ 0 ].subMenu.toggleVisibility();
    }
  }

  isTargetEqualsElement( element, target ) {
    return element === target;
  }

  isContentMath( element ) {
    return this.anchorElements.filter( ( value, index, array ) => {
      return value[ 'rootElement' ] === element;
    } );
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

  setMenuServiceInstance( menuService ) {
    this.subMenuService = menuService;
  }

  setInputFocus() {
    setTimeout( () => {
      this.inputElement.nativeElement.focus();
    }, 100 );
  }

  getWidth() {
    const border = 1;
    return Math.round( parseInt( this.width, 10 ) + border ) + 'px';
  }

  toggleVisibility() {
    this.visibilityMenu = !this.visibilityMenu;
    if ( this.visibilityMenu ) {
      this.setInputFocus();
    }
  }

  setTopPosition() {
    this.topPosition = '-' + this.topDislocation + 'px';
  }


}
