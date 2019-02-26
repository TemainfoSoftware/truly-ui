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
  Component, EventEmitter, Input, OnDestroy, OnInit, Output, ElementRef, Renderer2, ViewChild, ViewContainerRef,
  AfterContentInit,
} from '@angular/core';
import { SubMenuService } from '../menu/services/submenu.service';

const allContextMenu = [];
let windowListener;

@Component( {
  selector: 'tl-context-menu',
  templateUrl: './context-menu.html',
  styleUrls: [ './context-menu.scss' ],
  providers: [ SubMenuService ]
} )
export class TlContextMenu implements OnInit, AfterContentInit, OnDestroy {

  @Input() items = [];

  @Input() label = '';

  @Input() icon = '';

  @Input() subItem = '';

  @Input() target = '';

  @Input() width = '250px';

  @Input() itemHeight = '30px';

  @Output() show: EventEmitter<any> = new EventEmitter();

  @ViewChild( 'menuList', { read: ViewContainerRef } ) menuList: ViewContainerRef;

  @ViewChild( 'wrapperContextMenu' ) wrapperContextMenu;

  public listElement;

  public iconElement;

  public labelElement;

  public arrowElement;

  public position = { left: 0, top: 0 };

  public globalListeners = [];

  public open = false;

  public callBack = Function();

  constructor( private renderer: Renderer2, private subMenuService: SubMenuService,
               private viewRoot: ViewContainerRef ) {
    windowListener = undefined;
  }

  ngOnInit() {
    this.listenDocument();
    this.listenContextMenu();
    allContextMenu.push( this );
  }

  ngAfterContentInit() {
    this.subMenuService.setRenderer( this.renderer );
    this.subMenuService.setRootMenu( this.menuList );
    this.subMenuService.setViewRootMenu( this.viewRoot );
    this.subMenuService.setViewSubMenu( this.menuList );
    this.createBaseList();
  }

  createBaseList() {
    for ( let item = 0; item < this.items.length; item++ ) {
      this.createElementList( this.items[ item ] );
      this.createElementLabel( this.items[ item ] );
      this.createElementIcon( this.items[ item ] );
      this.createElementArrowSubItem( this.items[ item ] );
      this.relocateElements();
      this.handleSubItems( this.items[ item ] );
    }
  }

  handleSubItems( item ) {
    if ( item[ this.subItem ] ) {
      this.subMenuService.setAnchorRootElement( this.listElement.nativeElement );
      this.subMenuService.setSubMenuData( item[ this.subItem ], this );
      this.subMenuService.createSimpleSubMenu();
    }
  }

  listenContextMenu() {
    if ( !windowListener ) {
      windowListener = this.renderer.listen( window, 'contextmenu', ( $event ) => {
        $event.preventDefault();
        for ( const item of allContextMenu ) {
          if ( $event.target === item.target ) {
            item.resetProperties();
            item.open = true;
            item.setContextMenuPosition( $event );
            return;
          }
        }
        this.resetProperties();
        this.open = true;
        this.setContextMenuPosition( $event );
      } );
    }
  }

  resetProperties() {
    allContextMenu.forEach( ( item ) => item.open = false );
    this.subMenuService.closeMenu();
  }

  createElementList( item ) {
    this.listElement = new ElementRef( this.renderer.createElement( 'li' ) );
    this.renderer.addClass( this.listElement.nativeElement, 'ui-context-item' );
    this.listenClickElementList( item );
    this.setStyleListElement();
  }


  createElementIcon( item ) {
    this.iconElement = new ElementRef( this.renderer.createElement( 'i' ) );
    this.renderer.addClass( this.iconElement.nativeElement, 'ui-icon' );
    if ( item[ this.icon ] ) {
      this.renderer.addClass( this.iconElement.nativeElement, item[ this.icon ] );
    }
  }

  createElementLabel( item ) {
    this.labelElement = new ElementRef( this.renderer.createElement( 'span' ) );
    this.renderer.addClass( this.labelElement.nativeElement, 'ui-label' );
    this.labelElement.nativeElement.innerHTML = item[ this.label ];
  }

  createElementArrowSubItem( item ) {
    if ( item[ this.subItem ] ) {
      this.arrowElement = new ElementRef( this.renderer.createElement( 'i' ) );
      this.renderer.addClass( this.arrowElement.nativeElement, 'ui-icon' );
      this.renderer.addClass( this.arrowElement.nativeElement, 'ion-ios-arrow-right' );
    }
  }

  relocateElements() {
    this.renderer.appendChild( this.listElement.nativeElement, this.iconElement.nativeElement );
    this.renderer.appendChild( this.listElement.nativeElement, this.labelElement.nativeElement );
    this.renderer.appendChild( this.menuList.element.nativeElement, this.listElement.nativeElement );
    if (this.arrowElement) {
      this.renderer.appendChild( this.listElement.nativeElement, this.arrowElement.nativeElement );
    }
  }

  listenClickElementList( item ) {
    this.renderer.listen( this.listElement.nativeElement, 'click', ( MouseEvent ) => {
      if ( item[ 'callback' ] ) {
        this.callBack = item[ 'callback' ];
        this.callBack( MouseEvent );
      }
    } );
  }

  setStyleListElement() {
    this.renderer.setStyle( this.listElement.nativeElement, 'max-width', this.width );
    this.renderer.setStyle( this.listElement.nativeElement, 'height', this.itemHeight );
    this.renderer.setStyle( this.listElement.nativeElement, 'line-height', this.itemHeight );
    this.renderer.setStyle( this.listElement.nativeElement, 'grid-template-columns',
      '25px 1fr 25px' );
  }

  setContextMenuPosition( $event ) {
    this.open = true;
    this.position.top = $event.y;
    !this.fitsOnScreen( $event ) ? this.setContextMenuAfterMouse( $event ) :
      this.setContextMenuBeforeMouse( $event );
  }

  setContextMenuBeforeMouse( $event ) {
    const minWidthWrapperContextMenu = 250;
    this.position.left = $event.x - minWidthWrapperContextMenu;
  }

  setContextMenuAfterMouse( $event ) {
    this.position.left = $event.x;
  }

  listenDocument() {
    this.globalListeners.push( this.renderer.listen( document, 'click', ( $event ) => {
      this.open = false;
    } ) );
  }

  fitsOnScreen( $event ) {
    const minWidthWrapperContextMenu = 250;
    return ($event.clientX + minWidthWrapperContextMenu) >= window.innerWidth;
  }

  ngOnDestroy() {
    this.globalListeners.forEach( ( item ) => {
      item();
    } );
    windowListener();
  }

}

