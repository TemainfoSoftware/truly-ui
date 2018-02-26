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
  Component, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2,
} from '@angular/core';
import { TlButton } from '../button/button';

@Component( {
  selector: 'tl-overlay-panel',
  templateUrl: './overlay-panel.html',
  styleUrls: [ './overlay-panel.scss' ],
} )
export class TlOverlayPanel implements OnInit, OnDestroy {

  @Input() position = { left: '', top: '' };

  @Output() show: EventEmitter<any> = new EventEmitter();

  public target;

  public open = false;

  public globalListeners = [];

  constructor( private renderer: Renderer2 ) {}

  ngOnInit() {
    this.listenDocument();
    this.listenScroll();
  }

  listenScroll() {
    this.globalListeners.push( this.renderer.listen( window, 'scroll', () => {
      if ( this.target ) {
        this.setPositionElement();
      }
    } ) );
  }

  listenDocument() {
    this.globalListeners.push( this.renderer.listen( document, 'click', ( $event ) => {
      if ( !($event.path.indexOf( this.target ) >= 0) ) {
        this.open = false;
      }
    } ) );
  }

  handleTarget( target ) {
    if ( target instanceof TlButton ) {
      this.target = target.element.nativeElement;
    }
  }

  showPanel( $event, target? ) {
    this.target = target ? target : $event.target;
    this.handleTarget( target );
    this.setPositionElement();
    this.open = !this.open;
  }

  setPositionElement() {
    this.position.left = this.target.getBoundingClientRect().left;
    this.position.top = this.target.getBoundingClientRect().top + this.target.offsetHeight;
  }

  ngOnDestroy() {
    this.globalListeners.forEach( ( item ) => {
      item();
    } );
  }

}

