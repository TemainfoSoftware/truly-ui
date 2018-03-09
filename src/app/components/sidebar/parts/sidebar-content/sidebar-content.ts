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
  Component, OnInit, HostBinding, ElementRef, ComponentFactoryResolver, ViewContainerRef,
  Renderer2
} from '@angular/core';
import { TlBackdrop } from '../../../core/components/backdrop/backdrop';

@Component( {
  selector: 'tl-sidebar-content',
  templateUrl: './sidebar-content.html',
  styleUrls: [ './sidebar-content.scss' ],
} )

export class TlSidebarContent implements OnInit {

  @HostBinding( 'style.height' )
  public height = '400px';

  @HostBinding( 'style.width' )
  public width = '100%';

  public transform = '';

  public innerWidth = '';

  public start = { width: 0, mode: '', docked: false, opened: false, dockWidth: 0 };

  public end = { width: 0, mode: '', opened: false };

  public backdrop;

  constructor( private element: ElementRef,
               private renderer: Renderer2,
               private factory: ComponentFactoryResolver,
               private view: ViewContainerRef ) {
  }

  ngOnInit() {
    this.innerWidth = this.width;
    this.listenScroll();
  }

  setMovement( value ) {
    switch ( value.sidebar.position ) {
      case 'start':
        this.moveSidebarStart( value );
        break;
      case 'end':
        this.moveSidebarEnd( value );
        break;
    }
  }

  setMovementInitialDock() {
    this.innerWidth = (this.element.nativeElement.offsetWidth - this.start.dockWidth + 'px');
    this.transform = 'translateX(' + this.start.dockWidth + 'px)';
  }

  moveSidebarStart( value ) {
    this.setStart( value );
    switch ( this.start.mode ) {
      case 'over':
        this.createBackdrop( value );
        break;
      case 'push':
        this.handlePushStart();
        break;
      case 'slide':
        this.handleSlideStart();
        break;
    }
  }

  moveSidebarEnd( value ) {
    this.setEnd( value );
    switch ( this.end.mode ) {
      case 'over':
        this.createBackdrop( value );
        break;
      case 'push':
        this.handlePushEnd();
        break;
      case 'slide':
        this.handleSlideEnd();
    }
  }

  handleSlideStart() {
    if ( this.start.opened && this.start.docked) {
      return this.setMovementInitialDock();
    }

    if ( this.start.opened ) {
      this.setTransformStartWidth();
      this.setWidthWrapperStart();
      if ( this.isNotOverAndOpened() ) {
        return this.setWidthWrapperStartAndEnd();
      }
      return;
    }

    if ( this.end.opened && this.end.mode === 'push' ) {
      this.innerWidth = this.width;
      this.transform = 'translateX( -' + this.end.width + 'px)';
      return;
    }

    if ( this.end.opened ) {
      this.transform = 'translateX(0)';
      this.setWidthWrapperEnd();
      return;
    }

    this.transform = 'translateX(0)';
    this.innerWidth = this.width;
  }

  handlePushStart() {
    if ( this.start.opened ) {
      return this.setTransformStartWidth();
    }

    if ( this.end.opened ) {
      this.transform = 'translateX(0)';
      return this.setWidthWrapperEnd();
    }

    this.transform = 'translateX(0)';
    this.innerWidth = this.width;
  }

  handleSlideEnd() {
    if ( this.isNotOverAndOpened() ) {
      this.setWidthWrapperStartAndEnd();
      this.setTransformStartWidth();
      return;
    }

    if ( this.end.opened ) {
      this.transform = 'translateX(0)';
      this.setWidthWrapperEnd();
      return;
    }

    if ( this.start.opened && this.start.mode === 'push' ) {
      this.innerWidth = this.width;
      return this.setTransformStartWidth();
    }

    if (this.start.docked) {
      return;
    }

    if ( this.start.opened ) {
      this.setWidthWrapperEnd();
      this.setTransformEndWidth();
      return;
    }

    this.innerWidth = this.width;
  }

  createBackdrop( value ) {
    if ( !this.backdrop ) {
      const componentFactory = this.factory.resolveComponentFactory( TlBackdrop );
      this.backdrop = this.view.createComponent( componentFactory );
      this.setBackdropOptions();
      (<TlBackdrop>this.backdrop.instance).click.subscribe( () => {
        this.closeSidebar( value );
      } );
      return;
    }
    this.removeBackdrop();
  }

  isNotOverAndOpened() {
    return ((this.start.opened) && (this.start.mode !== 'over')) && ((this.end.opened) && (this.end.mode !== 'over'));
  }

  listenScroll() {
    this.renderer.listen( document, 'scroll', () => {
      this.setBackdropOptions();
    } );
  }

  setBackdropOptions() {
    if ( this.backdrop ) {
      (<TlBackdrop>this.backdrop.instance).setBackdropOptions(
        {
          'width': this.element.nativeElement.offsetWidth + 'px',
          'height': this.element.nativeElement.offsetHeight + 'px',
          'top': this.element.nativeElement.getBoundingClientRect().top + 'px',
          'left': this.element.nativeElement.getBoundingClientRect().left + 'px'
        }
      );
    }
  }

  closeSidebar( value ) {
    value.sidebar.opened = false;
    this.removeBackdrop();
  }

  removeBackdrop() {
    this.view.remove( this.view.indexOf( this.backdrop ) );
    this.backdrop = undefined;
  }

  setTransformEndWidth() {
    this.transform = 'translateX( ' + this.end.width + 'px)';
  }

  setTransformStartWidth() {
    this.transform = 'translateX( ' + this.start.width + 'px)';
  }

  setWidthWrapperStartAndEnd() {
    this.innerWidth = (this.element.nativeElement.offsetWidth - this.start.width - this.end.width) + 'px';
  }

  setWidthWrapperStart() {
    this.innerWidth = (this.element.nativeElement.offsetWidth - this.start.width) + 'px';
  }

  setWidthWrapperEnd() {
    this.innerWidth = (this.element.nativeElement.offsetWidth - this.end.width) + 'px';
  }

  handlePushEnd() {
    if ( this.end.opened && !this.start.opened ) {
      return this.transform = 'translateX( -' + this.end.width + 'px)';
    }

    if ( !this.start.opened ) {
      this.transform = 'translateX(0)';
      this.innerWidth = this.width;
      return;
    }

    if ( !this.end.opened && this.start.opened ) {
      this.setTransformStartWidth();
      this.setWidthWrapperStart();
      return;
    }

    this.transform = 'translateX( -' + this.end.width + 'px)';
    this.innerWidth = this.width;
  }

  setEnd( value ) {
    this.end.opened = value.sidebar.opened;
    this.end.mode = value.sidebar.mode;
    this.end.width = value.sidebar.width;
  }

  setStart( value ) {
    this.start.opened = value.sidebar.opened;
    this.start.mode = value.sidebar.mode;
    this.start.dockWidth = value.sidebar.dockWidth;
    this.start.docked = value.sidebar.docked;
    this.start.width = value.sidebar.width;
  }

}
