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
  Input, Component, OnInit, Output, EventEmitter,
  SimpleChanges, OnChanges, AfterContentInit, ViewContainerRef, ComponentFactoryResolver, Renderer2,
  ElementRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { TlBackdrop } from '../../../core/components/backdrop/backdrop';

@Component( {
  selector: 'tl-sidebar',
  templateUrl: './sidebar.html',
  styleUrls: [ './sidebar.scss' ],
} )

export class TlSidebar implements OnInit, AfterContentInit, OnChanges {

  @Input() opened = false;

  @Input() mode: 'push' | 'over' | 'slide' = 'slide';

  @Input() width = 300;

  @Input() position: 'start' | 'end' = 'start';

  @Input() dockWidth = 80;

  @Input() dock = false;

  @Output() openedChange: EventEmitter<boolean> = new EventEmitter();

  @Output() open: EventEmitter<any> = new EventEmitter();

  @Output() close: EventEmitter<any> = new EventEmitter();

  public docked = false;

  public toggleChange = new Subject();

  private sidebarWidth;

  private backdrop;

  constructor( private renderer: Renderer2,
               private element: ElementRef,
               private factory: ComponentFactoryResolver,
               private view: ViewContainerRef ) {
  }

  ngOnInit() {
    this.sidebarWidth = this.width;
    this.handleDockAndPosition();
    this.handleDockSidebar();
    this.listenScroll();
  }

  ngAfterContentInit() {
    setTimeout( () => {
      this.toggleChangeEmitter();
    }, 1 );
  }

  toggle() {
    this.handleBackdropOnOver();
    if ( this.docked ) {
      this.openDockSidebar();
      return;
    }

    if ( this.dock && !this.docked ) {
      this.closeDockSidebar();
      return;
    }

    this.opened = !this.opened;
    this.toggleChangeEmitter();
  }

  openDockSidebar() {
    this.setDockOpened();
    this.opened = true;
    this.emitOpenClose();
    this.toggleChangeEmitter();
  }

  closeDockSidebar() {
    this.setDockClosed();
    this.opened = false;
    this.emitOpenClose();
    this.toggleChangeEmitter();
  }

  handleDockAndPosition() {
    if ( this.dock && this.position === 'end' ) {
      throw Error( 'The Dock property is unavailable in [end] position' );
    }
  }

  handleBackdropOnOver() {
    if ( this.isModeOver() ) {
      this.createBackdrop();
    }
  }

  handleDockSidebar() {
    if ( this.dock && !this.opened ) {
      this.docked = true;
      this.width = this.dockWidth;
      this.opened = false;
    }
  }

  listenScroll() {
    if ( this.isModeOver() ) {
      this.renderer.listen( document, 'scroll', ( $event ) => {
        this.setBackdropOptions();
      } );
    }
  }

  toggleChangeEmitter() {
    this.toggleChange.next( { 'sidebar': this } );
  }

  emitOpenClose() {
    this.opened ? this.open.emit() : this.close.emit();
  }

  isChangeDockOpen( change ) {
    return (!change[ 'opened' ].currentValue) && (this.dock);
  }

  isChangeDockClose( change ) {
    return (change[ 'opened' ].currentValue) && (this.dock);
  }

  setDockClosed() {
    this.docked = true;
    this.width = this.dockWidth;
    this.handleRemoveBackdrop();
  }

  handleRemoveBackdrop() {
    if ( this.backdrop ) {
      this.removeBackdrop();
    }
  }

  setDockOpened() {
    this.docked = false;
    this.width = this.sidebarWidth;
  }

  isFirstChange( change ) {
    return change[ 'opened' ].firstChange;
  }

  isModeOver() {
    return this.mode === 'over';
  }

  setBackdropOptions() {
    if ( this.backdrop ) {
      (<TlBackdrop>this.backdrop.instance).setBackdropOptions(
        {
          'width': this.element.nativeElement.offsetParent.offsetWidth + 'px',
          'height': this.element.nativeElement.offsetParent.offsetHeight + 'px',
          'top': this.element.nativeElement.offsetParent.getBoundingClientRect().top + 'px',
          'left': this.element.nativeElement.offsetParent.getBoundingClientRect().left + 'px',
          'zIndex': 1
        }
      );
    }
  }

  createBackdrop() {
    if ( !this.backdrop && this.mode === 'over' ) {
      const componentFactory = this.factory.resolveComponentFactory( TlBackdrop );
      this.backdrop = this.view.createComponent( componentFactory );
      this.setBackdropOptions();
      (<TlBackdrop>this.backdrop.instance).click.subscribe( () => {
        this.dock ? this.setDockClosed() : this.opened = false;
        this.removeBackdrop();
        this.openedChange.emit( this.opened );
      } );
      return;
    }
    this.handleRemoveBackdrop();
  }



  removeBackdrop() {
    if (this.backdrop) {
      this.view.remove( this.view.indexOf( this.backdrop ) );
      this.backdrop = undefined;
    }
  }

  ngOnChanges( change: SimpleChanges ) {
    if ( change[ 'opened' ] ) {
      this.openedChange.emit( change[ 'opened' ].currentValue );
      if ( this.isModeOver() && !this.opened ) {
        this.removeBackdrop();
      }
      if ( this.isModeOver() && this.opened ) {
        this.createBackdrop();
      }
      if ( this.isChangeDockOpen( change ) && (!this.isFirstChange( change )) ) {
        this.setDockClosed();
        this.emitOpenClose();
        this.toggleChangeEmitter();
        return;
      }
      if ( this.isChangeDockClose( change ) && (!this.isFirstChange( change )) ) {
        this.setDockOpened();
        this.emitOpenClose();
        this.toggleChangeEmitter();
        return;
      }
      this.toggleChangeEmitter();
    }
  }

}
