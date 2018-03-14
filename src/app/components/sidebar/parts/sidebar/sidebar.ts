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
  Input, Component, OnInit, Output, EventEmitter,
  SimpleChanges, OnChanges, AfterContentInit, AfterViewInit
} from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component( {
  selector: 'tl-sidebar',
  templateUrl: './sidebar.html',
  styleUrls: [ './sidebar.scss' ],
} )

export class TlSidebar implements OnInit, AfterContentInit, OnChanges {

  @Input() opened = false;

  @Input() mode: 'push' | 'over' | 'slide' = 'push';

  @Input() width = 300;

  @Input() position = 'start';

  @Input() dockWidth = 80;

  @Input() dock = false;

  @Output() openedChange: EventEmitter<boolean> = new EventEmitter();

  @Output() open: EventEmitter<any> = new EventEmitter();

  @Output() close: EventEmitter<any> = new EventEmitter();

  public docked = false;

  public toggleChange = new Subject();

  private sidebarWidth;

  constructor() {}

  ngOnInit() {
    this.sidebarWidth = this.width;
    this.handleDockAndPosition();
    this.handleDockSidebar();
  }

  ngAfterContentInit() {
    setTimeout( () => {
      if ( this.mode !== 'over' ) {
        this.toggleChangeEmitter();
      }
    }, 1 );
  }

  toggle() {
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

  handleDockSidebar() {
    if ( this.dock && !this.opened ) {
      this.docked = true;
      this.width = this.dockWidth;
      this.opened = false;
    }
  }

  toggleChangeEmitter() {
    this.toggleChange.next( { 'sidebar': this } );
  }

  emitOpenClose() {
    this.opened ? this.open.emit() : this.close.emit();
  }

  isChangeDockOpen( change ) {
    return !change[ 'opened' ].currentValue && this.dock && !change[ 'opened' ].firstChange;
  }

  isChangeDockClose( change ) {
    return change[ 'opened' ].currentValue && this.dock && !change[ 'opened' ].firstChange;
  }

  setDockClosed() {
    this.docked = true;
    this.width = this.dockWidth;
  }

  setDockOpened() {
    this.docked = false;
    this.width = this.sidebarWidth;
  }

  ngOnChanges( change: SimpleChanges ) {
    if ( change[ 'opened' ] ) {
      this.openedChange.emit( change[ 'opened' ].currentValue );
      if ( this.isChangeDockOpen( change ) ) {
        this.setDockClosed();
        this.emitOpenClose();
        this.toggleChangeEmitter();
      }
      if ( this.isChangeDockClose( change ) ) {
        this.setDockOpened();
        this.emitOpenClose();
        this.toggleChangeEmitter();
      }
    }
  }

}
