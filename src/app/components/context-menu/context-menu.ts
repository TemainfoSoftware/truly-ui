/*
 MIT License

 Copyright (c) 2018 Temainfo Software

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
  Component, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, ViewChild, ViewContainerRef,
  ComponentFactoryResolver,
} from '@angular/core';
import { TlContextMenuItem } from './parts/context-menu-item';

const allContextMenu = [];
let windowListener;

@Component( {
  selector: 'tl-context-menu',
  templateUrl: './context-menu.html',
  styleUrls: [ './context-menu.scss' ],
} )
export class TlContextMenu implements OnInit, OnDestroy {

  @Input() items = [];

  @Input() label = '';

  @Input() icon = '';

  @Input() subItem = '';

  @Input() target = '';

  @Output() show: EventEmitter<any> = new EventEmitter();

  @ViewChild( 'menuList', { read: ViewContainerRef } ) menuList: ViewContainerRef;

  public position = { left: 0, top: 0 };

  public listeners = [];

  public globalListeners = [];

  public open = false;

  public anchors = [];

  private callBack = Function();

  public mainList;

  constructor( private renderer: Renderer2, private componentResolver: ComponentFactoryResolver ) {}

  ngOnInit() {
    this.listenDocument();
    this.listenContextMenu();
    allContextMenu.push( this );
  }

  createList() {
    if ( !this.mainList ) {
      for ( let item = 0; item < this.items.length; item++ ) {
        const factory = this.componentResolver.resolveComponentFactory( TlContextMenuItem );
        this.mainList = this.menuList.createComponent( factory );
        this.setProperties( item, this.mainList, null );
        this.handleSubItems( item, this.mainList );
      }
    }
  }

  handleSubItems( item, componentSubItem, list? ) {
    const items = list ? list : this.items;
    if ( items[ item ][ this.subItem ] ) {
      this.renderer.setAttribute( componentSubItem.location.nativeElement, 'anchor', 'true' );
      const object = { 'anchor': componentSubItem, 'children': [] };
      this.anchors.push( object );
      this.handleMouseHover( items, item, object );
      this.handleMouseLeave( object );
    }
  }

  handleMouseHover( items, item, object ) {
    this.listeners.push( this.renderer.listen( object.anchor.location.nativeElement, 'mouseover', () => {
      if ( object.children.length === 0 ) {
        this.createSubItemList( items[ item ][ this.subItem ], object );
      }
    } ) );
  }

  handleMouseLeave( componentSubItem ) {
    this.listeners.push( this.renderer.listen( componentSubItem.anchor.location.nativeElement, 'mouseleave', () => {
        this.removeChildren( componentSubItem );
    } ) );
  }

  removeChildren( related ) {
    related.children.forEach( ( item ) => {
      this.menuList.remove( this.menuList.indexOf( item ) );
    } );
    related.children = [];
  }

  createSubItemList( list, parentElement ) {
    for ( let index = 0; index < list.length; index++ ) {
      const factory = this.componentResolver.resolveComponentFactory( TlContextMenuItem );
      const subItem = this.menuList.createComponent( factory );
      parentElement.children.push( subItem );
      this.renderer.appendChild( parentElement.anchor.location.nativeElement, subItem.location.nativeElement );
      this.setProperties( index, subItem, parentElement.anchor, list );
      this.handleSubItems( index, subItem, list );
    }
  }

  setProperties( index, subItem, parentElement, list? ) {
    const items = list ? list : this.items;
    this.setPositionChildElement( subItem, index, items.length - 1, parentElement );
    (<TlContextMenuItem>subItem.instance).label = items[ index ][ this.label ];
    (<TlContextMenuItem>subItem.instance).icon = items[ index ][ this.icon ];
    (<TlContextMenuItem>subItem.instance).subItem = items[ index ][ this.subItem ];
    (<TlContextMenuItem>subItem.instance).callBack = items[ index ].callBack;
  }

  setPositionChildElement( subItem, index, lastIndex, parentElement ) {
    if ( parentElement ) {
      (<TlContextMenuItem>subItem.instance).fitWidth();
      (<TlContextMenuItem>subItem.instance).setBorders( index, lastIndex );
      (<TlContextMenuItem>subItem.instance).styleConfig = {
          'position': 'fixed',
          'left': parentElement.location.nativeElement.firstElementChild.getBoundingClientRect().left
          + parentElement.location.nativeElement.firstElementChild.offsetWidth,
          'top': parentElement.location.nativeElement.firstElementChild.getBoundingClientRect().top
          + parentElement.location.nativeElement.firstElementChild.offsetHeight * index
        };
    }
  }

  listenContextMenu() {
    if ( !windowListener ) {
      windowListener = this.renderer.listen( window, 'contextmenu', ( $event ) => {
        for ( const item of allContextMenu ) {
          if ( $event.target === item.target ) {
            item.resetProperties();
            item.createList();
            item.setContextMenuPosition( $event );
          } else if (!item.target) {
            this.resetProperties();
            this.createList();
            this.setContextMenuPosition( $event );
          }
        }
      } );
    }
  }

  resetProperties() {
    allContextMenu.forEach( ( item ) => item.open = false );
    this.menuList.clear();
    this.mainList = null;
    this.anchors = [];
  }

  setContextMenuPosition( $event ) {
    $event.preventDefault();
    this.position.left = $event.x;
    this.position.top = $event.y;
    this.open = true;
  }

  listenDocument() {
    this.globalListeners.push( this.renderer.listen( document, 'click', ( $event ) => {
      this.open = false;
    } ) );
  }

  ngOnDestroy() {
    this.globalListeners.forEach( ( item ) => {
      item();
    } );
    windowListener();
  }

}

