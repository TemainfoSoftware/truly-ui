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
  Component, OnInit, HostBinding, ElementRef,
  Renderer2, Input, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';

@Component( {
  selector: 'tl-sidebar-content',
  templateUrl: './sidebar-content.html',
  styleUrls: [ './sidebar-content.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )

export class TlSidebarContent implements OnInit {

  @Input()
  @HostBinding( 'style.height' )
  public height = '100%';

  @HostBinding( 'style.width' )
  public width = '100%';

  public transform = '';

  public innerWidth = '';

  public start = { width: 0, mode: '', docked: false, opened: false, dockWidth: 0, dock: false };

  public end = { width: 0, mode: '', opened: false };

  constructor( private element: ElementRef,
               private change: ChangeDetectorRef ) {
  }

  ngOnInit() {
    this.innerWidth = this.width;
  }

  setMovement( value ) {
    this.setOptionsMovement( value );
    switch ( value.sidebar.position ) {
      case 'start':
        this.moveSidebarStart();
        break;
      case 'end':
        this.moveSidebarEnd();
        break;
    }
  }

  setOptionsMovement( value ) {
    if ( value.sidebar.position === 'start' ) {
      this.setStart( value );
    } else {
      this.setEnd( value );
    }
  }

  setMovementInitialDock() {
    this.innerWidth = (this.element.nativeElement.offsetWidth - this.start.dockWidth + 'px');
    this.setTransformDock();
    this.change.detectChanges();
  }

  setTransformDock() {
    this.transform = this.start.dockWidth + 'px';
  }

  moveSidebarStart() {
    switch ( this.start.mode ) {
      case 'over':
       if ( this.start.dock ) {
         this.setMovementInitialDock();
       }
       break;
      case 'push':
        this.handlePushStart();
        break;
      case 'slide':
        this.handleSlideStart();
        break;
    }
    this.change.detectChanges();
  }

  moveSidebarEnd() {
    switch ( this.end.mode ) {
      case 'push':
        this.handlePushEnd();
        break;
      case 'slide':
        this.handleSlideEnd();
        break;
    }
    this.change.detectChanges();
  }

  handleSlideStart() {
    if ( !this.start.opened && this.start.docked ) {
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
      this.transform = '-' + this.end.width + 'px';
      return;
    }

    if ( this.end.opened ) {
      this.transform = '0';
      this.setWidthWrapperEnd();
      return;
    }

    if ( (!this.start.opened) && (this.start.dock) ) {
      return this.setMovementInitialDock();
    }

    this.transform = '0';
    this.innerWidth = this.width;
  }

  handlePushStart() {
    if ( this.start.dock && this.start.docked ) {
      return this.setMovementInitialDock();
    }

    if ( this.start.opened ) {
      return this.setTransformStartWidth();
    }

    if ( this.end.opened ) {
      this.transform = '0';
      return this.setWidthWrapperEnd();
    }

    this.transform = '0';
    this.innerWidth = this.width;
  }

  handleSlideEnd() {

    if ( this.start.opened && this.start.docked ) {
      return;
    }

    if ( !this.start.opened && this.start.docked && !this.end.opened ) {
      return this.setMovementInitialDock();
    }

    if ( this.isNotOverAndOpened() ) {
      this.setWidthWrapperStartAndEnd();
      this.setTransformStartWidth();
      return;
    }

    if ( this.start.docked && this.end.opened ) {
      this.setWidthWrapperDockEnd();
      this.setTransformDock();
      return;
    }

    if ( this.end.opened ) {
      this.transform = '0';
      this.setWidthWrapperEnd();
      return;
    }

    if ( this.start.opened && this.start.mode === 'push' ) {
      this.innerWidth = this.width;
      return this.setTransformStartWidth();
    }

    if ( this.start.opened && this.start.mode !== 'over') {
      this.setWidthWrapperStart();
      this.setTransformStartWidth();
      return;
    }

    this.innerWidth = this.width;

  }

  setWidthWrapperDockEnd() {
    this.innerWidth = (this.element.nativeElement.offsetWidth - this.end.width - this.start.dockWidth) + 'px';
  }

  isNotOverAndOpened() {
    return ((this.start.opened) && (this.start.mode !== 'over')) && ((this.end.opened) && (this.end.mode !== 'over'));
  }

  setTransformEndWidth() {
    this.transform = this.end.width + 'px';
  }

  setTransformStartWidth() {
    this.transform = this.start.width + 'px';
    this.change.detectChanges();
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
    if ( this.start.dock && !this.end.opened ) {
      return this.setMovementInitialDock();
    }

    if ( this.end.opened && !this.start.opened ) {
      this.innerWidth = this.width;
      return this.transform = '-' + this.end.width + 'px';
    }

    if ( !this.start.opened && !this.start.dock ) {
      this.transform = '0';
      this.innerWidth = this.width;
      return;
    }

    if ( !this.end.opened && this.start.opened ) {
      this.setTransformStartWidth();
      this.setWidthWrapperStart();
      return;
    }

    if ( this.start.dock && !this.end.opened ) {
      return this.setMovementInitialDock();
    }

    this.transform = '-' + this.end.width + 'px';
    this.innerWidth = this.width;

  }

  setEnd( value ) {
    this.end.opened = value.sidebar.opened;
    this.end.mode = value.sidebar.mode;
    this.end.width = value.sidebar.width;
  }

  setStart( value ) {
    this.start.opened = value.sidebar.opened;
    this.start.dock = value.sidebar.dock;
    this.start.mode = value.sidebar.mode;
    this.start.dockWidth = value.sidebar.dockWidth;
    this.start.docked = value.sidebar.docked;
    this.start.width = value.sidebar.width;
  }

}
