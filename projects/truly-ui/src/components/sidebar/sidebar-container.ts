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
  AfterContentInit,
  Component, ContentChild, ContentChildren, forwardRef, OnDestroy, QueryList, Renderer2,
} from '@angular/core';
import { TlSidebar } from './parts/sidebar/sidebar';
import { TlSidebarContent } from './parts/sidebar-content/sidebar-content';
import { SidebarService } from '../modal/services/sidebar.service';
import { Subscription } from 'rxjs';

@Component( {
  selector: 'tl-sidebar-container',
  templateUrl: './sidebar-container.html',
  styleUrls: [ './sidebar-container.scss' ],
} )

export class TlSidebarContainer implements AfterContentInit, OnDestroy {

  @ContentChildren( forwardRef( () => TlSidebar ) ) sidebar: QueryList<TlSidebar>;

  @ContentChild( TlSidebarContent ) sidebarContent;

  private subscription: Subscription = new Subscription();

  constructor( private sidebarService: SidebarService, private renderer: Renderer2 ) {}

  ngAfterContentInit() {
    this.setSidebarMovement();
    this.listenResize();
  }

  setSidebarMovement() {
    this.sidebar.forEach( ( item ) => {
      this.subscription.add( item.toggleChange.subscribe( ( value ) => {
        this.sidebarContent.setMovement( value );
        this.sidebarService.setChange( value );
      } ) );
    } );
  }

  listenResize() {
    this.subscription.add(this.renderer.listen( window, 'resize', () => {
      this.sidebar.forEach( ( item ) => {
        this.sidebarContent.setMovement( { sidebar: item } );
      } );
    } ));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
