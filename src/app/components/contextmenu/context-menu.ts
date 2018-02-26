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
  AfterViewInit,
  Component, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, ViewChild, ViewContainerRef,
} from '@angular/core';
import { MenuService } from '../core/services/menu.service';

const allContextMenu = [];
let windowListener;

@Component( {
  selector: 'tl-context-menu',
  templateUrl: './context-menu.html',
  styleUrls: [ './context-menu.scss' ],
  providers: [ MenuService ]
} )
export class TlContextMenu implements OnInit, OnDestroy, AfterViewInit {

  @Input() items = [];

  @Input() label = '';

  @Input() icon = '';

  @Input() subItem = '';

  @Input() target = '';

  @Output() show: EventEmitter<any> = new EventEmitter();

  @ViewChild( 'menuList', { read: ViewContainerRef } ) menuList: ViewContainerRef;

  @ViewChild( 'wrapperContextMenu' ) wrapperContextMenu;

  public position = { left: 0, top: 0 };

  public globalListeners = [];

  public open = false;

  constructor( private renderer: Renderer2, private menuService: MenuService ) {
    windowListener = undefined;
  }

  ngOnInit() {
    this.listenDocument();
    this.listenContextMenu();
    allContextMenu.push( this );
  }

  ngAfterViewInit() {
    this.menuService.setMenuConfig( {
      label: this.label,
      subItem: this.subItem,
      icon: this.icon,
      items: this.items
    }, this.menuList, this.renderer );
  }

  listenContextMenu() {
    if ( !windowListener ) {
      windowListener = this.renderer.listen( window, 'contextmenu', ( $event ) => {
        $event.preventDefault();
        for ( const item of allContextMenu ) {
          if ( $event.target === item.target ) {
            item.resetProperties();
            item.menuService.createList();
            item.setContextMenuPosition( $event );
            return;
          }
        }
        this.resetProperties();
        this.menuService.createList();
        this.setContextMenuPosition( $event );
      } );
    }
  }

  resetProperties() {
    allContextMenu.forEach( ( item ) => item.open = false );
    this.menuService.resetMenu();
  }

  setContextMenuPosition( $event ) {
    this.open = true;
    this.position.top = $event.y;
    !this.fitsOnScreen( $event ) ? this.setContextMenuAfterMouse( $event ) :
      this.setContextMenuBeforeMouse( $event );
  }

  setContextMenuBeforeMouse( $event ) {
    const minWidthWrapperContextMenu  = 250;
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
    const minWidthWrapperContextMenu  = 250;
    return ($event.clientX + minWidthWrapperContextMenu) >= window.innerWidth;
  }

  ngOnDestroy() {
    this.globalListeners.forEach( ( item ) => {
      item();
    } );
    windowListener();
  }

}

